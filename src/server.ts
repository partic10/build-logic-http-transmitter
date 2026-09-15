import express from 'express';
import dotenv from 'dotenv';
import { panelRouter } from './routes/panel';
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
app.use('/api/ai', aiRouter);
app.use('/api/transmitter', transmitterRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Build Logic HTTP Transmitter running on port ${PORT}`);
  console.log(`Panel Size: ${process.env.PANEL_WIDTH || 16}x${process.env.PANEL_HEIGHT || 16}`);
});
