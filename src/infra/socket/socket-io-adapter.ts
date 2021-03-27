import { Message } from './../../domain/use-cases/send-message/send-message';
import { SocketReceiver } from './../../data/protocols/socket/socket-receiver';
import { SocketSender } from './../../data/protocols/socket/socket-sender';
import { SocketIOHelper } from '../helpers/socket-io-helper';

export class SocketIOAdapter implements SocketSender, SocketReceiver {
  constructor(private readonly messageTypes: string[]) {}

  send(message: Message): void {
    const socket = SocketIOHelper.getInstance();
    socket.emit(message.type, message.payload);
    return;
  }

  receive(callback: (message: Message) => void): void {
    const socket = SocketIOHelper.getInstance();
    this.messageTypes.forEach((type: string) =>
      socket.on(type, (payload: any) =>
        callback({
          type,
          payload,
        }),
      ),
    );
    return;
  }
}
