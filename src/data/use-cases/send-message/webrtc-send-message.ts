import {
  Message,
  SendMessage,
} from '../../../domain/use-cases/send-message/send-message';

import { WebRTCSender } from '../../protocols/webrtc/webrtc-sender';

export default class WebRTCSendMessage implements SendMessage {
  constructor(private readonly webRTCSender: WebRTCSender) {}

  send(message: Message): void {
    this.webRTCSender.send(message);
    return;
  }
}
