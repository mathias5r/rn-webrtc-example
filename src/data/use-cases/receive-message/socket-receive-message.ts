import { Message } from '../../../domain/use-cases/send-message/send-message';
import { SocketReceiver } from '../../protocols/socket/socket-receiver';
import { ReceiveMessage } from './../../../domain/use-cases/receive-message/receive-message';

export class SocketReceiveMessage implements ReceiveMessage {
  constructor(private readonly socketReceiver: SocketReceiver) {}

  receive(callback: (message: Message) => void): void {
    this.socketReceiver.receive(callback);
  }
}
