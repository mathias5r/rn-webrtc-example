import { Message } from '@/domain/use-cases/send-message/send-message';

export interface WebRTCSender {
  send: (message: Message) => void;
}
