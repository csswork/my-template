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

      // Check existing user
      const [existing] = await conn.query(
        'SELECT id FROM users WHERE username = ? OR email = ? OR phone = ? OR wechat = ?',
        [username, email, phone, wechat]
      );

      if (existing.length) {
        return res.status(400).json({
          success: false,
          message: 'Username, email, phone or wechat already exists'
        });
      }

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

      await conn.commit();

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          id: userResult.insertId,
          username,
          email,
          phone,
          wechat
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
  }
};