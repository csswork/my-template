import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../../utils/db.js';

const router = express.Router();


// Validation middleware
const validatePost = [
  body('title').notEmpty().trim().escape(),
  body('content').notEmpty(),
  body('status').isIn(['draft', 'published']).optional()
];

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    // const [rows] = await pool.query(
    //   'SELECT * FROM posts ORDER BY created_at DESC'
    // );
    res.json({ success: true, data: [1,2,3] });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM posts WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create new post
router.post('/', validatePost, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const { title, content, status = 'draft' } = req.body;
    const [result] = await pool.query(
      'INSERT INTO posts (title, content, status) VALUES (?, ?, ?)',
      [title, content, status]
    );
    
    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        title,
        content,
        status
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update post
router.put('/:id', validatePost, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const { title, content, status } = req.body;
    const [result] = await pool.query(
      'UPDATE posts SET title = ?, content = ?, status = ? WHERE id = ?',
      [title, content, status, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      data: { id: req.params.id, title, content, status }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM posts WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
  
});

export default router;