import { Message } from '../../domain/use-cases/send-message/send-message';

export interface SignalingSender {
  send: (message: Message) => void;
}
