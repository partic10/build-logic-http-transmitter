import axios, { AxiosInstance } from 'axios';
import { TransmitResponse, BuildLogicResponse } from '../types';

export class HttpTransmitter {
  private client: AxiosInstance;
  private host: string;
  private port: number;
  private apiKey: string;

  constructor(
    host: string = process.env.BUILD_LOGIC_HOST || 'localhost',
    port: number = parseInt(process.env.BUILD_LOGIC_PORT || '5000'),
    apiKey: string = process.env.BUILD_LOGIC_API_KEY || ''
  ) {
    this.host = host;
    this.port = port;
    this.apiKey = apiKey;

    this.client = axios.create({
      baseURL: `http://${this.host}:${this.port}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      timeout: 5000,
    });
  }

  async sendPanelData(pixels: any[]): Promise<TransmitResponse> {
    try {
      const response = await this.client.post<BuildLogicResponse>('/panel/update', {
        pixels,
        timestamp: Date.now(),
      });

      return {
        success: response.data.status === 'success',
        message: response.data.data?.message || 'Pixels transmitted',
        pixelCount: pixels.length,
        timestamp: Date.now(),
      };
    } catch (error: any) {
      console.error('Transmitter Error:', error.message);
      return {
        success: false,
        message: `Transmission failed: ${error.message}`,
        pixelCount: 0,
        timestamp: Date.now(),
      };
    }
  }

  async getPanelStatus(): Promise<any> {
    try {
      const response = await this.client.get('/panel/status');
      return response.data;
    } catch (error: any) {
      console.error('Status Check Error:', error.message);
      throw error;
    }
  }

  async clearPanel(): Promise<TransmitResponse> {
    try {
      const response = await this.client.post<BuildLogicResponse>('/panel/clear', {});
      return {
        success: response.data.status === 'success',
        message: 'Panel cleared',
        pixelCount: 0,
        timestamp: Date.now(),
      };
    } catch (error: any) {
      console.error('Clear Panel Error:', error.message);
      return {
        success: false,
        message: `Failed to clear panel: ${error.message}`,
        pixelCount: 0,
        timestamp: Date.now(),
      };
    }
  }
}
