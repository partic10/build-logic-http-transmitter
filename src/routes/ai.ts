import { Router, Request, Response } from 'express';
import { AIEngine } from '../services/AIEngine';
import { HttpTransmitter } from '../services/HttpTransmitter';

export const aiRouter = Router();
const aiEngine = new AIEngine();
const transmitter = new HttpTransmitter();

/**
 * POST /api/ai/render-prompt
 * Generate and render panel from AI prompt
 */
aiRouter.post('/render-prompt', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required and must be a string' });
    }

    const command = await aiEngine.generateFromPrompt(prompt);
    const result = await transmitter.sendPanelData(command.pixels);

    res.json({
      ...result,
      aiCommand: command,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/ai/animate
 * Generate animation from description
 */
aiRouter.post('/animate', async (req: Request, res: Response) => {
  try {
    const { description, frameCount = 10, delayMs = 100 } = req.body;

    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'Description is required' });
    }

    const frames = await aiEngine.generateAnimation(description, frameCount);

    res.json({
      success: true,
      frameCount: frames.length,
      frames,
      playbackDelay: delayMs,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
