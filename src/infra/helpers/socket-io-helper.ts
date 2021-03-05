import { io, Socket } from 'socket.io-client';

export class SocketIOHelper {
  private static _instance: Socket;

  private constructor() {}

  public static getInstance(): Socket {
    if (!this._instance) {
      this._instance = io(
        process.env.URL_SOCKET_SERVER || 'http://192.168.0.23:3000',
        { transports: ['websocket'] },
      );
      this._instance.on('connect', () => {
        console.log(`Socket ${this._instance.id} connected`);
      });
      this._instance.on('disconnect', () =>
        console.log(`Socket ${this._instance.id} disconnected`),
      );
      this._instance.on('connect_error', (err: any) => {
        console.log(`connect_error due to ${err.message}`);
      });
      this._instance.on('error', (error: any) =>
        console.log(`Socket ${this._instance.id} error: ${error}`),
      );
    }
    return this._instance;
  }
}
