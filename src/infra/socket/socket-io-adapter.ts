import { Message } from './../../domain/use-cases/send-message/send-message';
import { SocketReceiver } from './../../data/protocols/socket/socket-receiver';
import { SocketSender } from './../../data/protocols/socket/socket-sender';
import { SocketIOHelper } from '../helpers/socket-io-helper';

export class SocketIOAdapter implements SocketSender, SocketReceiver {
  send(message: Message): void {
    const socket = SocketIOHelper.getInstance();
    socket.emit(message.type, message.payload);
    return;
  }

  receive(callback: (message: Message) => void): void {
    const socket = SocketIOHelper.getInstance();
    socket.on('disconnect', () =>
      callback({
        type: 'disconnect',
        payload: null,
      }),
    );
    socket.on('connect', () =>
      callback({
        type: 'connect',
        payload: null,
      }),
    );
    socket.on('error', (err: any) =>
      callback({
        type: 'error',
        payload: {
          error: err.message,
        },
      }),
    );
    socket.on('connect_error', (err: any) =>
      callback({
        type: 'connect_error',
        payload: {
          error: err.message,
        },
      }),
    );
    socket.on('created', (args: any) =>
      callback({
        type: 'created',
        payload: args,
      }),
    );
    socket.on('joined', (args: any) =>
      callback({
        type: 'joined',
        payload: args,
      }),
    );
    socket.on('ready', (args: any) =>
      callback({
        type: 'ready',
        payload: args,
      }),
    );
    socket.on('full', () =>
      callback({
        type: 'full',
        payload: {},
      }),
    );
    socket.on('offer', (args: any) =>
      callback({
        type: 'offer',
        payload: args,
      }),
    );
    socket.on('answer', (args: any) =>
      callback({
        type: 'answer',
        payload: args,
      }),
    );
    socket.on('candidate', (args: any) =>
      callback({
        type: 'candidate',
        payload: args,
      }),
    );
    return;
  }
}
