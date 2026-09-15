export interface PanelPixel {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface PanelState {
  width: number;
  height: number;
  pixels: PanelPixel[];
  timestamp: number;
}

export interface AICommand {
  action: string;
  description: string;
  pixels: PanelPixel[];
  confidence: number;
}

export interface TransmitResponse {
  success: boolean;
  message: string;
  pixelCount: number;
  timestamp: number;
}

export interface BuildLogicResponse {
  status: 'success' | 'error';
  data?: any;
  error?: string;
}
