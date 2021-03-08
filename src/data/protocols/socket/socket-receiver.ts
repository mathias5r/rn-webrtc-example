import { Message } from '../../../domain/use-cases/send-message/send-message';

export interface SocketReceiver {
  receive: (callback: (message: Message) => void) => void;
}
