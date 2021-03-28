import { WebRTCSender } from '../../data/protocols/webrtc/webrtc-sender';
import { Message } from '../../domain/use-cases/send-message/send-message';
import { SignalingReceiver } from '../protocols/signaling-receiver';
import { SignalingSender } from '../protocols/signaling-sender';

export class WebRTCAdapter implements WebRTCSender {
  private roomID = 'test-room';

  constructor(
    private readonly signalingSender: SignalingSender,
    private readonly signalingReceiver: SignalingReceiver,
  ) {
    this.init();
  }

  private messageHandler(_: Message) {
    return;
  }

  public init(): void {
    this.signalingSender.send({
      type: 'create_or_join',
      payload: {
        roomID: this.roomID,
      },
    });
    this.signalingReceiver.receive(this.messageHandler);
  }

  send(_: Message): void {
    return;
  }
}
