import { io, Socket } from 'socket.io-client';

export class SocketIOHelper {
  private static _instance: Socket;

  public static getInstance(): Socket {
    if (!this._instance) {
      this._instance = io(
        process.env.URL_SOCKET_SERVER || 'http://192.168.0.20:3000',
      );
    }
    return this._instance;
  }
}
