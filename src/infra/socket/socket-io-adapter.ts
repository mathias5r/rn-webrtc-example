import { Message } from '../../domain/use-cases/send-message/send-message';
import { SocketSender } from './../../data/protocols/socket/socket-sender';
import { SocketIOHelper } from '../helpers/socket-io-helper';

export class SocketIOAdapter implements SocketSender {
  send(message: Message): void {
    const socket = SocketIOHelper.getInstance();
    socket.emit('message', message);
    return;
  }
}
