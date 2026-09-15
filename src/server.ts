import express from 'express';
import dotenv from 'dotenv';
import { panelRouter } from './routes/panel';
import { colorRouter } from './routes/color';
import { characterRouter } from './routes/character';
import { aiRouter } from './routes/ai';
import { transmitterRouter } from './routes/transmitter';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/panel', panelRouter);
app.use('/api/color', colorRouter);
app.use('/api/character', characterRouter);
app.use('/api/ai', aiRouter);
app.use('/api/transmitter', transmitterRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Documentation
app.get('/api', (req, res) => {
  res.json({
    name: 'Build Logic HTTP Transmitter API',
    version: '1.0.0',
    description: 'Control 16x16 panel displays with colors, characters, and AI',
    endpoints: {
      panel: '/api/panel - Pixel rendering control',
      color: '/api/color - Color transmission and palettes',
      character: '/api/character - Text and character rendering',
      ai: '/api/ai - AI-powered generation',
      transmitter: '/api/transmitter - Transmitter info and stats',
    },
  });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Build Logic HTTP Transmitter running on port ${PORT}`);
  console.log(`📺 Panel Size: ${process.env.PANEL_WIDTH || 16}x${process.env.PANEL_HEIGHT || 16}`);
  console.log(`📡 Color Transmitter: ${process.env.COLOR_TRANSMITTER_HOST || 'localhost'}:${process.env.COLOR_TRANSMITTER_PORT || 5001}`);
  console.log(`📝 Character Transmitter: ${process.env.CHARACTER_TRANSMITTER_HOST || 'localhost'}:${process.env.CHARACTER_TRANSMITTER_PORT || 5002}`);
  console.log(`🔗 API Documentation: http://localhost:${PORT}/api`);
});
