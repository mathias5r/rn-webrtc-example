import { SocketSendMessage } from './socket-send-message';
import { SocketSender } from '../../protocols/socket/socket-sender';
import { Message, SendMessage } from '../../../domain/send-message';

const makeFakeMessage = (): Message => ({
  instrument: 'piano',
  note: 'A',
});

const makeSocketSenderStub = (): SocketSender => {
  class SocketSenderStub implements SocketSender {
    send(_: Message): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new SocketSenderStub();
};

interface SutTypes {
  socketSenderStub: SocketSender;
  sendMessageSut: SendMessage;
}

const makeSut = (): SutTypes => {
  const socketSenderStub = makeSocketSenderStub();
  const sendMessageSut = new SocketSendMessage(socketSenderStub);
  return {
    socketSenderStub,
    sendMessageSut,
  };
};

describe('SendMessage UseCase', () => {
  it('Should call SocketSender with correct values', async () => {
    const { socketSenderStub, sendMessageSut } = makeSut();
    const sendSpy = jest.spyOn(socketSenderStub, 'send');
    await sendMessageSut.send(makeFakeMessage());
    expect(sendSpy).toHaveBeenCalledWith(makeFakeMessage());
  });
});
