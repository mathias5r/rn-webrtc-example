import {
  Message,
  SendMessage,
} from '../../../domain/use-cases/send-message/send-message';
import { SocketReceiver } from '../../protocols/socket/socket-receiver';
import { ReceiveMessage } from '../../../domain/use-cases/receive-message/receive-message';
import { SocketSender } from '../../protocols/socket/socket-sender';

export class Socket implements ReceiveMessage, SendMessage {
  constructor(
    private readonly socketReceiver: SocketReceiver,
    private readonly socketSender: SocketSender,
  ) {}

  receive(callback: (message: Message) => void): void {
    this.socketReceiver.receive(callback);
  }

  send(message: Message): void {
    this.socketSender.send(message);
    return;
  }
}
