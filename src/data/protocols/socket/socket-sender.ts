import { Message } from '../../../domain/send-message';

export interface SocketSender {
  send: (message: Message) => void;
}
