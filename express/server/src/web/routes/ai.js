import express from 'express';
import VolcEngine from '../../models/VolcEngine.js';

const router = express.Router();
const volcEngine = new VolcEngine();

router.post('/ai', async (req, res) => {
    try {
        // res.json({ success: true, data: [1,2,3] });

        const result = await volcEngine.processImage(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
});

export default router;