import { Message } from '../send-message/send-message';

export interface ReceiveMessage {
  receive: (callback: (message: Message) => void) => void;
}
