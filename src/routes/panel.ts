import { Router, Request, Response } from 'express';
import { HttpTransmitter } from '../services/HttpTransmitter';
import { PanelPixel } from '../types';

export const panelRouter = Router();
const transmitter = new HttpTransmitter();

/**
 * POST /api/panel/render
 * Render pixels to the 16x16 panel
 */
panelRouter.post('/render', async (req: Request, res: Response) => {
  try {
    const { pixels } = req.body;

    if (!Array.isArray(pixels)) {
      return res.status(400).json({ error: 'Pixels must be an array' });
    }

    const result = await transmitter.sendPanelData(pixels);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/panel/clear
 * Clear all pixels from the panel
 */
panelRouter.post('/clear', async (req: Request, res: Response) => {
  try {
    const result = await transmitter.clearPanel();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/panel/status
 * Get current panel status
 */
panelRouter.get('/status', async (req: Request, res: Response) => {
  try {
    const status = await transmitter.getPanelStatus();
    res.json(status);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/panel/draw-pixel
 * Draw a single pixel
 */
panelRouter.post('/draw-pixel', async (req: Request, res: Response) => {
  try {
    const { x, y, r, g, b, a } = req.body;

    if (x === undefined || y === undefined || r === undefined || g === undefined || b === undefined) {
      return res.status(400).json({ error: 'Missing required pixel properties (x, y, r, g, b)' });
    }

    const pixel: PanelPixel = { x, y, r, g, b, a: a || 255 };
    const result = await transmitter.sendPanelData([pixel]);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
