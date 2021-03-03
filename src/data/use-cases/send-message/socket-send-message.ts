import { SocketSender } from '../../protocols/socket/socket-sender';
import { Message, SendMessage } from '../../../domain/send-message';

export class SocketSendMessage implements SendMessage {
  constructor(private readonly socketSender: SocketSender) {}

  async send(message: Message): Promise<void> {
    await this.socketSender.send(message);
    return new Promise((resolve) => resolve());
  }
}
