import { Message } from '@/domain/use-cases/send-message/send-message';

export interface ReceiveMessage {
  receive: (callback: (message: Message) => void) => void;
}
