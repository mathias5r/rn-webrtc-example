import { Message } from '@/domain/use-cases/send-message/send-message';

export interface SignalingReceiver {
  receive: (callback: (message: Message) => void) => void;
}
