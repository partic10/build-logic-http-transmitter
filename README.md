# Build Logic HTTP Transmitter API

🎮 **HTTP Transmitter API for Build Logic (Roblox)** - Control 16x16 panel displays with AI integration

## Features

✨ **Core Features:**
- 🎨 16x16 pixel panel rendering
- 🤖 AI-powered image generation (text-to-panel)
- 🎬 Animation frame generation
- 📡 HTTP-based communication with Build Logic servers
- 🚀 Batch pixel updates
- 📊 Real-time panel status monitoring

## Quick Start

### Installation

```bash
git clone https://github.com/partic10/build-logic-http-transmitter.git
cd build-logic-http-transmitter
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your settings:
```env
PORT=3000
NODE_ENV=development
BUILD_LOGIC_HOST=localhost
BUILD_LOGIC_PORT=5000
BUILD_LOGIC_API_KEY=your_key
AI_MODEL=gpt-4
AI_API_KEY=your_openai_key
```

### Running

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

## API Endpoints

### Panel Control

#### Render Pixels
```http
POST /api/panel/render
Content-Type: application/json

{
  "pixels": [
    { "x": 0, "y": 0, "r": 255, "g": 0, "b": 0, "a": 255 },
    { "x": 1, "y": 1, "r": 0, "g": 255, "b": 0, "a": 255 }
  ]
}
```

#### Draw Single Pixel
```http
POST /api/panel/draw-pixel
Content-Type: application/json

{
  "x": 5,
  "y": 5,
  "r": 255,
  "g": 255,
  "b": 255,
  "a": 255
}
```

#### Clear Panel
```http
POST /api/panel/clear
```

#### Get Panel Status
```http
GET /api/panel/status
```

### AI Features

#### Render from Text Prompt
```http
POST /api/ai/render-prompt
Content-Type: application/json

{
  "prompt": "Draw a red square in the center"
}
```

#### Generate Animation
```http
POST /api/ai/animate
Content-Type: application/json

{
  "description": "Spinning rainbow gradient",
  "frameCount": 10,
  "delayMs": 100
}
```

### Transmitter Control

#### Get Transmitter Info
```http
GET /api/transmitter/info
```

#### Batch Update
```http
POST /api/transmitter/batch
Content-Type: application/json

{
  "updates": [
    { "pixels": [...] },
    { "pixels": [...] }
  ]
}
```

#### Get Stats
```http
GET /api/transmitter/stats
```

## Project Structure

```
src/
├── server.ts              # Main Express app
├── types/
│   └── index.ts          # TypeScript type definitions
├── services/
│   ├── HttpTransmitter.ts # Build Logic communication
│   └── AIEngine.ts        # AI image generation
├── routes/
│   ├── panel.ts          # Panel control endpoints
│   ├── ai.ts             # AI endpoints
│   └── transmitter.ts    # Transmitter endpoints
└── middleware/
    └── errorHandler.ts   # Error handling
```

## Build Logic Integration

This API communicates with Build Logic servers via HTTP. Ensure your Build Logic server has:

- `/panel/update` endpoint to receive pixel data
- `/panel/status` endpoint to report status
- `/panel/clear` endpoint to clear the display

## AI Integration

The AI engine is designed to work with:
- **OpenAI GPT-4** (recommended)
- **Claude**
- **Custom ML models**

Implement the `generateFromPrompt()` method with your preferred AI service.

## Examples

### JavaScript/TypeScript Client

```typescript
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Render a red square
await client.post('/panel/render', {
  pixels: [
    { x: 0, y: 0, r: 255, g: 0, b: 0, a: 255 },
    { x: 1, y: 0, r: 255, g: 0, b: 0, a: 255 },
    { x: 0, y: 1, r: 255, g: 0, b: 0, a: 255 },
    { x: 1, y: 1, r: 255, g: 0, b: 0, a: 255 },
  ],
});

// AI-generated image
await client.post('/ai/render-prompt', {
  prompt: 'Blue vertical lines',
});
```

### cURL

```bash
# Clear the panel
curl -X POST http://localhost:3000/api/panel/clear

# Get status
curl http://localhost:3000/api/panel/status

# AI render
curl -X POST http://localhost:3000/api/ai/render-prompt \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Red circle"}'
```

## License

MIT

## Support

For issues or questions, open a GitHub issue or contact the maintainers.

---

**Made for Build Logic by Tomtom4500** 🎮
