import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../utils/db.js';

export const userController = {
  // Register with profile
  async register(req, res) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const { 
        username, 
        email, 
        password,
        phone,
        wechat,
        profile 
      } = req.body;

      // ... existing validation code ...

      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const [userResult] = await conn.query(
        'INSERT INTO users (username, email, password, phone, wechat) VALUES (?, ?, ?, ?, ?)',
        [username, email, hashedPassword, phone, wechat]
      );

      // Create profile if provided
      if (profile) {
        await conn.query(
          `INSERT INTO user_profiles (
            user_id, 
            avatar_url, 
            address, 
            company, 
            gender,
            first_name,
            last_name,
            bio,
            birth_date,
            website
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            userResult.insertId,
            profile.avatar_url,
            profile.address,
            profile.company,
            profile.gender,
            profile.first_name,
            profile.last_name,
            profile.bio,
            profile.birth_date,
            profile.website
          ]
        );
      }

      // Get complete user data after creation
      const [userData] = await conn.query(
        `SELECT 
          u.id,
          u.username,
          u.email,
          u.phone,
          u.wechat,
          u.role,
          p.avatar_url,
          p.first_name,
          p.last_name,
          p.company
        FROM users u
        LEFT JOIN user_profiles p ON u.id = p.user_id
        WHERE u.id = ?`,
        [userResult.insertId]
      );

      // Generate token
      const token = jwt.sign(
        { 
          id: userResult.insertId, 
          username: username,
          role: 'user' // Default role for new users
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      await conn.commit();

      // Update last login timestamp
      await pool.query(
        'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [userResult.insertId]
      );

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          token,
          user: {
            id: userData[0].id,
            username: userData[0].username,
            email: userData[0].email,
            phone: userData[0].phone,
            wechat: userData[0].wechat,
            role: userData[0].role,
            profile: {
              avatar_url: userData[0].avatar_url,
              first_name: userData[0].first_name,
              last_name: userData[0].last_name,
              company: userData[0].company
            }
          }
        }
      });
    } catch (error) {
      await conn.rollback();
      res.status(500).json({
        success: false,
        message: error.message
      });
    } finally {
      conn.release();
    }
  },

  // Get user profile with details
  async getProfile(req, res) {
    try {
      const [rows] = await pool.query(
        `SELECT 
          u.id,
          u.username,
          u.email,
          u.phone,
          u.wechat,
          u.role,
          u.created_at,
          p.avatar_url,
          p.address,
          p.company,
          p.gender,
          p.first_name,
          p.last_name,
          p.bio,
          p.birth_date,
          p.website
        FROM users u
        LEFT JOIN user_profiles p ON u.id = p.user_id
        WHERE u.id = ?`,
        [req.user.id]
      );

      if (!rows.length) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: rows[0]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update profile
  async updateProfile(req, res) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const { 
        email, 
        password,
        phone,
        wechat,
        profile 
      } = req.body;

      // Update user table
      let userUpdates = [];
      let userValues = [];

      if (email) {
        userUpdates.push('email = ?');
        userValues.push(email);
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        userUpdates.push('password = ?');
        userValues.push(hashedPassword);
      }
      if (phone) {
        userUpdates.push('phone = ?');
        userValues.push(phone);
      }
      if (wechat) {
        userUpdates.push('wechat = ?');
        userValues.push(wechat);
      }

      if (userUpdates.length) {
        userValues.push(req.user.id);
        await conn.query(
          `UPDATE users SET ${userUpdates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
          userValues
        );
      }

      // Update profile table
      if (profile) {
        const [existingProfile] = await conn.query(
          'SELECT id FROM user_profiles WHERE user_id = ?',
          [req.user.id]
        );

        if (existingProfile.length) {
          await conn.query(
            `UPDATE user_profiles SET 
              avatar_url = COALESCE(?, avatar_url),
              address = COALESCE(?, address),
              company = COALESCE(?, company),
              gender = COALESCE(?, gender),
              first_name = COALESCE(?, first_name),
              last_name = COALESCE(?, last_name),
              bio = COALESCE(?, bio),
              birth_date = COALESCE(?, birth_date),
              website = COALESCE(?, website),
              updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ?`,
            [
              profile.avatar_url,
              profile.address,
              profile.company,
              profile.gender,
              profile.first_name,
              profile.last_name,
              profile.bio,
              profile.birth_date,
              profile.website,
              req.user.id
            ]
          );
        } else {
          await conn.query(
            `INSERT INTO user_profiles (
              user_id,
              avatar_url,
              address,
              company,
              gender,
              first_name,
              last_name,
              bio,
              birth_date,
              website
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              req.user.id,
              profile.avatar_url,
              profile.address,
              profile.company,
              profile.gender,
              profile.first_name,
              profile.last_name,
              profile.bio,
              profile.birth_date,
              profile.website
            ]
          );
        }
      }

      await conn.commit();

      res.json({
        success: true,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      await conn.rollback();
      res.status(500).json({
        success: false,
        message: error.message
      });
    } finally {
      conn.release();
    }
  },

  // Login
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    try {
      // Get user with profile data
      const [rows] = await pool.query(
        `SELECT 
          u.id,
          u.username,
          u.email,
          u.phone,
          u.wechat,
          u.password,
          u.role,
          p.avatar_url,
          p.first_name,
          p.last_name,
          p.company
        FROM users u
        LEFT JOIN user_profiles p ON u.id = p.user_id
        WHERE u.username = ?`,
        [username]
      );

      if (!rows.length) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password'
        });
      }

      const user = rows[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password'
        });
      }

      // Create token with additional user info
      const token = jwt.sign(
        { 
          id: user.id, 
          username: user.username,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Remove sensitive data
      delete user.password;

      // Update last login timestamp
      await pool.query(
        'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
        [user.id]
      );

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            wechat: user.wechat,
            role: user.role,
            profile: {
              avatar_url: user.avatar_url,
              first_name: user.first_name,
              last_name: user.last_name,
              company: user.company
            }
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get user data
  async getUserByToken(req, res) {
    try {
      const [rows] = await pool.query(
        `SELECT 
          u.id,
          u.username,
          u.email,
          u.phone,
          u.wechat,
          u.role,
          u.created_at,
          p.avatar_url,
          p.first_name,
          p.last_name,
          p.company
        FROM users u
        LEFT JOIN user_profiles p ON u.id = p.user_id
        WHERE u.id = ?`,
        [req.user.id]
      );

      if (!rows.length) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: rows[0]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

};