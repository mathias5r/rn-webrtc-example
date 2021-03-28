/* eslint-disable no-new */
import { Message } from '../../domain/use-cases/send-message/send-message';
import { SignalingSender } from '../protocols/signaling-sender';
import { WebRTCAdapter } from './webrtc-adapter';
import { SignalingReceiver } from '../protocols/signaling-receiver';

const makeSignalingSenderStub = (): SignalingSender => {
  class SignalingSenderStub implements SignalingSender {
    send(_: Message): void {
      return;
    }
  }
  return new SignalingSenderStub();
};

const makeSignalingReceiverStub = (): SignalingReceiver => {
  class SignalingReceiverStub implements SignalingReceiver {
    receive(callback: (message: Message) => void): void {
      callback({
        type: 'song',
        payload: {
          instrument: 'piano',
          note: 'A',
        },
      });
      return;
    }
  }
  return new SignalingReceiverStub();
};

describe('WebRTC Adapter', () => {
  it('Should call SignalingSender with correct values', async () => {
    const signalingSenderStub = makeSignalingSenderStub();
    const signalingReceiverStub = makeSignalingReceiverStub();
    const sendSpy = jest.spyOn(signalingSenderStub, 'send');
    new WebRTCAdapter(signalingSenderStub, signalingReceiverStub);
    expect(sendSpy).toHaveBeenCalledWith({
      payload: {
        roomID: 'test-room',
      },
      type: 'create_or_join',
    });
  });

  it('Should call SignalingReceiver with correct values', async () => {
    const signalingSenderStub = makeSignalingSenderStub();
    const signalingReceiverStub = makeSignalingReceiverStub();
    const receiveSpy = jest.spyOn(signalingReceiverStub, 'receive');
    new WebRTCAdapter(signalingSenderStub, signalingReceiverStub);
    expect(receiveSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  it('Should call onCreate with correct values', async () => {
    const signalingSenderStub = makeSignalingSenderStub();
    const signalingReceiverStub = makeSignalingReceiverStub();
    jest
      .spyOn(signalingReceiverStub, 'receive')
      .mockImplementationOnce((callback) =>
        callback({
          type: 'created',
          payload: {},
        }),
      );
    const onCreatedSpy = jest.spyOn(
      WebRTCAdapter.prototype as any,
      'onCreated',
    );
    new WebRTCAdapter(signalingSenderStub, signalingReceiverStub);
    expect(onCreatedSpy).toHaveBeenCalledWith();
  });
});
