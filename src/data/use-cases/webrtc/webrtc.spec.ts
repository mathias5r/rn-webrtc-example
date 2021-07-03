import { Message } from '@/domain/use-cases/send-message/send-message';

import { WebRTCSender } from '@/data/protocols/webrtc/webrtc-sender';

import { WebRTC } from './webrtc';

const makeFakeMessage = (): Message => ({
  type: 'song',
  payload: {
    instrument: 'piano',
    note: 'A',
  },
});

const makeWebRTCSenderStub = (): WebRTCSender => {
  class WebRTCSenderStub implements WebRTCSender {
    send(_: Message): void {
      return;
    }
  }
  return new WebRTCSenderStub();
};

interface SutTypes {
  webRTCSendMessageSut: WebRTC;
  webRTCSenderStub: WebRTCSender;
}

const makeSut = (): SutTypes => {
  const webRTCSenderStub = makeWebRTCSenderStub();
  const webRTCSendMessageSut = new WebRTC(webRTCSenderStub);

  return {
    webRTCSenderStub,
    webRTCSendMessageSut,
  };
};

describe('WebRTC Send Message Use Case', () => {
  it('Should call WebRTCSender with correct values', () => {
    const { webRTCSenderStub, webRTCSendMessageSut } = makeSut();
    const sendSpy = jest.spyOn(webRTCSenderStub, 'send');
    webRTCSendMessageSut.send(makeFakeMessage());
    expect(sendSpy).toHaveBeenCalledWith(makeFakeMessage());
  });
});
