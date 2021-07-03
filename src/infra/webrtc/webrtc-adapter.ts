import { Message } from '@/domain/use-cases/send-message/send-message';

import { WebRTCSender } from '@/data/protocols/webrtc/webrtc-sender';

import { SignalingReceiver } from '@/infra/protocols/signaling-receiver';
import { SignalingSender } from '@/infra/protocols/signaling-sender';

import { WebRTCMessageType } from '@/utils/enums';

export class WebRTCAdapter implements WebRTCSender {
  private roomID = 'test-room2';
  private isMaster = false;
  private peerID: string | null = null;

  constructor(
    private readonly signalingSender: SignalingSender,
    private readonly signalingReceiver: SignalingReceiver,
  ) {
    this.init();
  }

  public init(): void {
    this.signalingSender.send({
      type: 'create_or_join',
      payload: {
        roomID: this.roomID,
      },
    });
    this.signalingReceiver.receive(this.messageHandler.bind(this));
  }

  private onCreated(): void {
    this.isMaster = true;
  }

  private onJoined(args: any): void {
    this.isMaster = false;
    this.peerID = args.socketID;
  }

  private messageHandler(message: Message) {
    switch (message.type) {
      case WebRTCMessageType.CREATED:
        this.onCreated();
        break;
      case WebRTCMessageType.JOINED:
        this.onJoined(message.payload);
        break;
      default:
        break;
    }
  }

  send(_: Message): void {
    return;
  }
}
