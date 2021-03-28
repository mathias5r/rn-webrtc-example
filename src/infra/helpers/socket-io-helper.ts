import { io, Socket } from 'socket.io-client';

export class SocketIOHelper {
  private static _instance: Socket;

  public static getInstance(): Socket {
    if (!this._instance) {
      this._instance = io(
        process.env.URL_SOCKET_SERVER ||
          'https://sound-share-server.herokuapp.com',
      );
    }
    return this._instance;
  }
}
