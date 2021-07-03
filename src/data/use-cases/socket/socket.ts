import {
  Message,
  SendMessage,
} from '@/domain/use-cases/send-message/send-message';
import { ReceiveMessage } from '@/domain/use-cases/receive-message/receive-message';

import { SocketReceiver } from '@/data/protocols/socket/socket-receiver';
import { SocketSender } from '@/data/protocols/socket/socket-sender';

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
