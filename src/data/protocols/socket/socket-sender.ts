import { Message } from '../../../domain/use-cases/send-message/send-message';

export interface SocketSender {
  send: (message: Message) => void;
}
