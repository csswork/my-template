import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

// Get posts list
router.get('/', async (req: Request, res: Response) => {
  try {

    res.json({ 
      success: true,
      data: [] 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching posts',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;