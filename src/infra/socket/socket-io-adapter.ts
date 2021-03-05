import { Message } from '../../domain/send-message';
import { SocketSender } from './../../data/protocols/socket/socket-sender';
import { SocketIOHelper } from '../helpers/socket-io-helper';

export class SocketIOAdapter implements SocketSender {
  async send(message: Message): Promise<void> {
    const socket = SocketIOHelper.getInstance();
    socket.emit('message', message);
    return new Promise((resolve) => resolve());
  }
}
