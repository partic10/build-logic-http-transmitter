import { Router, Request, Response } from 'express';
import { ColorTransmitter, ColorData } from '../services/ColorTransmitter';

export const colorRouter = Router();
const colorTransmitter = new ColorTransmitter();

/**
 * POST /api/color/set
 * Set a single color
 */
colorRouter.post('/set', async (req: Request, res: Response) => {
  try {
    const { r, g, b, a } = req.body;

    if (r === undefined || g === undefined || b === undefined) {
      return res.status(400).json({ error: 'Missing required color properties (r, g, b)' });
    }

    const color: ColorData = { r, g, b, a: a || 255 };
    const result = await colorTransmitter.sendColor(color);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/color/named
 * Set a named color (red, green, blue, etc.)
 */
colorRouter.post('/named', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Color name is required and must be a string' });
    }

    const result = await colorTransmitter.setNamedColor(name);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/color/palette
 * Send a color palette (multiple colors)
 */
colorRouter.post('/palette', async (req: Request, res: Response) => {
  try {
    const { colors } = req.body;

    if (!Array.isArray(colors)) {
      return res.status(400).json({ error: 'Colors must be an array' });
    }

    const result = await colorTransmitter.sendPalette(colors);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/color/gradient
 * Send a color gradient animation
 */
colorRouter.post('/gradient', async (req: Request, res: Response) => {
  try {
    const { colors, duration = 1000 } = req.body;

    if (!Array.isArray(colors)) {
      return res.status(400).json({ error: 'Colors must be an array' });
    }

    const result = await colorTransmitter.sendGradient(colors, duration);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/color/status
 * Get current color status
 */
colorRouter.get('/status', async (req: Request, res: Response) => {
  try {
    const status = await colorTransmitter.getColorStatus();
    res.json(status);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/color/palettes
 * Get available named color palettes
 */
colorRouter.get('/palettes', (req: Request, res: Response) => {
  const namedColors = [
    'red', 'green', 'blue', 'white', 'black', 'yellow',
    'cyan', 'magenta', 'orange', 'purple', 'pink', 'gray'
  ];

  res.json({
    available: namedColors,
    count: namedColors.length,
  });
});
