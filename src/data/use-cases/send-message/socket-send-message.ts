import { SocketSender } from '../../protocols/socket/socket-sender';
import {
  Message,
  SendMessage,
} from '../../../domain/use-cases/send-message/send-message';

export class SocketSendMessage implements SendMessage {
  constructor(private readonly socketSender: SocketSender) {}

  send(message: Message): void {
    this.socketSender.send(message);
    return;
  }
}
