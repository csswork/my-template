// Types API
// GET    /api/types
// POST   /api/types
// PUT    /api/types/:id
// DELETE /api/types/:id

import pool from '../../utils/db.js';

export const typeController = {
  // Get all types
  async getTypes(req, res) {
    try {
      const [rows] = await pool.query(
        `SELECT id, name, description, 
         created_at, updated_at 
         FROM types 
         ORDER BY created_at DESC`
      );
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new type
  async createType(req, res) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Type name is required'
        });
      }

      // Check if type already exists
      const [existing] = await pool.query(
        'SELECT id FROM types WHERE name = ?',
        [name]
      );

      if (existing.length) {
        return res.status(400).json({
          success: false,
          message: 'Type already exists'
        });
      }

      const [result] = await pool.query(
        'INSERT INTO types (name, description) VALUES (?, ?)',
        [name, description]
      );

      res.json({
        success: true,
        data: {
          id: result.insertId,
          name,
          description
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update type
  async updateType(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Type name is required'
        });
      }

      // Check if type exists
      const [existing] = await pool.query(
        'SELECT id FROM types WHERE id = ?',
        [id]
      );

      if (!existing.length) {
        return res.status(404).json({
          success: false,
          message: 'Type not found'
        });
      }

      // Check if name is taken by another type
      const [nameCheck] = await pool.query(
        'SELECT id FROM types WHERE name = ? AND id != ?',
        [name, id]
      );

      if (nameCheck.length) {
        return res.status(400).json({
          success: false,
          message: 'Type name already exists'
        });
      }

      await pool.query(
        `UPDATE types 
         SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [name, description, id]
      );

      res.json({
        success: true,
        message: 'Type updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete type
  async deleteType(req, res) {
    try {
      const { id } = req.params;

      // Check if type is being used by any categories
      const [categories] = await pool.query(
        'SELECT id FROM categories WHERE type_id = ?',
        [id]
      );

      if (categories.length) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete type that has associated categories'
        });
      }

      const [result] = await pool.query(
        'DELETE FROM types WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Type not found'
        });
      }

      res.json({
        success: true,
        message: 'Type deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};