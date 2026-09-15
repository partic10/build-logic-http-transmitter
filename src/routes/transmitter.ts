import { Router, Request, Response } from 'express';
import { HttpTransmitter } from '../services/HttpTransmitter';

export const transmitterRouter = Router();
const transmitter = new HttpTransmitter();

/**
 * GET /api/transmitter/info
 * Get transmitter info and configuration
 */
transmitterRouter.get('/info', (req: Request, res: Response) => {
  res.json({
    name: 'Build Logic HTTP Transmitter',
    version: '1.0.0',
    host: process.env.BUILD_LOGIC_HOST || 'localhost',
    port: process.env.BUILD_LOGIC_PORT || '5000',
    panelDimensions: {
      width: parseInt(process.env.PANEL_WIDTH || '16'),
      height: parseInt(process.env.PANEL_HEIGHT || '16'),
    },
    endpoints: {
      panel: '/api/panel',
      ai: '/api/ai',
      transmitter: '/api/transmitter',
    },
  });
});

/**
 * POST /api/transmitter/batch
 * Send multiple panel updates in batch
 */
transmitterRouter.post('/batch', async (req: Request, res: Response) => {
  try {
    const { updates } = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({ error: 'Updates must be an array' });
    }

    const results = [];
    for (const update of updates) {
      const result = await transmitter.sendPanelData(update.pixels);
      results.push(result);
    }

    res.json({
      success: true,
      batchSize: updates.length,
      results,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/transmitter/stats
 * Get transmitter statistics
 */
transmitterRouter.get('/stats', (req: Request, res: Response) => {
  res.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: Date.now(),
  });
});
