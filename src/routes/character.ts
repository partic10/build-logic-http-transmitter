import { Router, Request, Response } from 'express';
import { CharacterTransmitter, CharacterData } from '../services/CharacterTransmitter';

export const characterRouter = Router();
const characterTransmitter = new CharacterTransmitter();

/**
 * POST /api/character/single
 * Send a single character
 */
characterRouter.post('/single', async (req: Request, res: Response) => {
  try {
    const { x, y, char, fontSize, fontFamily, bold, italic } = req.body;

    if (x === undefined || y === undefined || !char) {
      return res.status(400).json({ error: 'Missing required properties (x, y, char)' });
    }

    const charData: CharacterData = { x, y, char, fontSize, fontFamily, bold, italic };
    const result = await characterTransmitter.sendCharacter(charData);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/character/text
 * Send text string
 */
characterRouter.post('/text', async (req: Request, res: Response) => {
  try {
    const { text, startX = 0, startY = 0, fontSize, fontFamily, bold, italic } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required and must be a string' });
    }

    const options = { fontSize, fontFamily, bold, italic };
    const result = await characterTransmitter.sendText(text, startX, startY, options);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/character/batch
 * Send multiple characters at once
 */
characterRouter.post('/batch', async (req: Request, res: Response) => {
  try {
    const { characters } = req.body;

    if (!Array.isArray(characters)) {
      return res.status(400).json({ error: 'Characters must be an array' });
    }

    const result = await characterTransmitter.sendCharacters(characters);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/character/scroll
 * Send scrolling text animation
 */
characterRouter.post('/scroll', async (req: Request, res: Response) => {
  try {
    const { text, speed = 500, direction = 'left' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required and must be a string' });
    }

    if (direction !== 'left' && direction !== 'right') {
      return res.status(400).json({ error: 'Direction must be "left" or "right"' });
    }

    const result = await characterTransmitter.scrollText(text, speed, direction);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/character/ascii
 * Render ASCII art
 */
characterRouter.post('/ascii', async (req: Request, res: Response) => {
  try {
    const { ascii, startX = 0, startY = 0 } = req.body;

    if (!ascii || typeof ascii !== 'string') {
      return res.status(400).json({ error: 'ASCII art is required and must be a string' });
    }

    const result = await characterTransmitter.sendAsciiArt(ascii, startX, startY);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/character/clear
 * Clear all characters
 */
characterRouter.post('/clear', async (req: Request, res: Response) => {
  try {
    const result = await characterTransmitter.clearCharacters();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/character/status
 * Get character rendering status
 */
characterRouter.get('/status', async (req: Request, res: Response) => {
  try {
    const status = await characterTransmitter.getCharacterStatus();
    res.json(status);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
