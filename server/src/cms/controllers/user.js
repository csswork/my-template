import pool from '../../utils/db.js';
import bcrypt from 'bcrypt';

export const userController = {
  // Get all users with their profiles
  async getUsers(req, res) {
    try {
      const [rows] = await pool.query(
        `SELECT u.id, u.username, u.email, u.role, u.status,
         up.first_name, up.last_name, up.avatar_url, up.gender,
         u.created_at, u.last_login
         FROM users u
         LEFT JOIN user_profiles up ON u.id = up.user_id
         ORDER BY u.created_at DESC`
      );
      
      res.json({
        success: true,
        data: rows.map(row => ({
          id: row.id,
          username: row.username,
          email: row.email,
          role: row.role,
          status: row.status,
          profile: {
            first_name: row.first_name,
            last_name: row.last_name,
            avatar_url: row.avatar_url,
            gender: row.gender
          },
          created_at: row.created_at,
          last_login: row.last_login
        }))
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new user with profile
  async createUser(req, res) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const { username, password, email, role, profile } = req.body;

      // Validate required fields
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required'
        });
      }

      // Check if username exists
      const [existing] = await connection.query(
        'SELECT id FROM users WHERE username = ?',
        [username]
      );

      if (existing.length) {
        return res.status(400).json({
          success: false,
          message: 'Username already exists'
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const [userResult] = await connection.query(
        `INSERT INTO users (username, password, email, role) 
         VALUES (?, ?, ?, ?)`,
        [username, hashedPassword, email, role || 'user']
      );

      // Create profile if provided
      if (profile) {
        await connection.query(
          `INSERT INTO user_profiles 
           (user_id, first_name, last_name, avatar_url, gender, birth_date, address) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            userResult.insertId,
            profile.first_name, profile.last_name,
            profile.avatar_url,
            profile.gender,
            profile.birth_date,
            profile.address
          ]
        );
      }

      await connection.commit();
      res.json({
        success: true,
        data: {
          id: userResult.insertId,
          username,
          email,
          role: role || 'user'
        }
      });
    } catch (error) {
      await connection.rollback();
      res.status(500).json({
        success: false,
        message: error.message
      });
    } finally {
      connection.release();
    }
  },

  // Update user and profile
  async updateUser(req, res) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const { id } = req.params;
      const { username, password, email, role, status, profile } = req.body;

      // Check if user exists
      const [existing] = await connection.query(
        'SELECT id FROM users WHERE id = ?',
        [id]
      );

      if (!existing.length) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Update user
      const updates = [];
      const values = [];

      if (username) {
        // Check username uniqueness
        const [nameCheck] = await connection.query(
          'SELECT id FROM users WHERE username = ? AND id != ?',
          [username, id]
        );

        if (nameCheck.length) {
          return res.status(400).json({
            success: false,
            message: 'Username already exists'
          });
        }
        updates.push('username = ?');
        values.push(username);
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.push('password = ?');
        values.push(hashedPassword);
      }

      if (email) {
        updates.push('email = ?');
        values.push(email);
      }

      if (role) {
        updates.push('role = ?');
        values.push(role);
      }

      if (status) {
        updates.push('status = ?');
        values.push(status);
      }

      if (updates.length) {
        values.push(id);
        await connection.query(
          `UPDATE users 
           SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP 
           WHERE id = ?`,
          values
        );
      }

      // Update profile if provided
      if (profile) {
        const [existingProfile] = await connection.query(
          'SELECT id FROM user_profiles WHERE user_id = ?',
          [id]
        );

        if (existingProfile.length) {
          await connection.query(
            `UPDATE user_profiles 
             SET nickname = ?, avatar_url = ?, gender = ?, 
                 birth_date = ?, address = ?, updated_at = CURRENT_TIMESTAMP
             WHERE user_id = ?`,
            [
              profile.first_name, profile.last_name,
              profile.avatar_url,
              profile.gender,
              profile.birth_date,
              profile.address,
              id
            ]
          );
        } else {
          await connection.query(
            `INSERT INTO user_profiles 
             (user_id, first, avatar_url, gender, birth_date, address)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
              id,
              profile.first_name, profile.last_name,
              profile.avatar_url,
              profile.gender,
              profile.birth_date,
              profile.address
            ]
          );
        }
      }

      await connection.commit();
      res.json({
        success: true,
        message: 'User updated successfully'
      });
    } catch (error) {
      await connection.rollback();
      res.status(500).json({
        success: false,
        message: error.message
      });
    } finally {
      connection.release();
    }
  },

  // Delete user and profile
  async deleteUser(req, res) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const { id } = req.params;

      // Profile will be deleted automatically due to ON DELETE CASCADE
      const [result] = await connection.query(
        'DELETE FROM users WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      await connection.commit();
      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      await connection.rollback();
      res.status(500).json({
        success: false,
        message: error.message
      });
    } finally {
      connection.release();
    }
  }
};