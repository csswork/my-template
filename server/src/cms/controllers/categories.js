// Categories API
// GET    /api/categories
// POST   /api/categories
// PUT    /api/categories/:id
// DELETE /api/categories/:id

import pool from '../../utils/db.js';

export const categoryController = {
  // Get all categories with post count
  async getCategories(req, res) {
    try {
      const [rows] = await pool.query(
        `SELECT c.id, c.name, c.description, 
         COUNT(DISTINCT pc.post_id) as post_count,
         c.created_at, c.updated_at
         FROM categories c
         LEFT JOIN post_categories pc ON c.id = pc.category_id
         GROUP BY c.id
         ORDER BY c.created_at DESC`
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

  // Create new category
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Category name is required'
        });
      }

      // Check if category already exists
      const [existing] = await pool.query(
        'SELECT id FROM categories WHERE name = ?',
        [name]
      );

      if (existing.length) {
        return res.status(400).json({
          success: false,
          message: 'Category already exists'
        });
      }

      const [result] = await pool.query(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
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

  // Update category
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Category name is required'
        });
      }

      // Check if category exists
      const [existing] = await pool.query(
        'SELECT id FROM categories WHERE id = ?',
        [id]
      );

      if (!existing.length) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      // Check if name is taken by another category
      const [nameCheck] = await pool.query(
        'SELECT id FROM categories WHERE name = ? AND id != ?',
        [name, id]
      );

      if (nameCheck.length) {
        return res.status(400).json({
          success: false,
          message: 'Category name already exists'
        });
      }

      await pool.query(
        `UPDATE categories 
         SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [name, description, id]
      );

      res.json({
        success: true,
        message: 'Category updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete category
  async deleteCategory(req, res) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const { id } = req.params;

      // Delete all post_category relationships first
      await connection.query(
        'DELETE FROM post_categories WHERE category_id = ?',
        [id]
      );

      // Then delete the category
      const [result] = await connection.query(
        'DELETE FROM categories WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        await connection.rollback();
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      await connection.commit();
      res.json({
        success: true,
        message: 'Category deleted successfully'
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