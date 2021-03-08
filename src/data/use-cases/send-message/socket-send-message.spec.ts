import { SocketSendMessage } from './socket-send-message';
import { SocketSender } from '../../protocols/socket/socket-sender';
import {
  Message,
  SendMessage,
} from '../../../domain/use-cases/send-message/send-message';

const makeFakeMessage = (): Message => ({
  type: 'song',
  payload: {
    instrument: 'piano',
    note: 'A',
  },
});

const makeSocketSenderStub = (): SocketSender => {
  class SocketSenderStub implements SocketSender {
    send(_: Message): void {
      return;
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
  it('Should call SocketSender with correct values', () => {
    const { socketSenderStub, sendMessageSut } = makeSut();
    const sendSpy = jest.spyOn(socketSenderStub, 'send');
    sendMessageSut.send(makeFakeMessage());
    expect(sendSpy).toHaveBeenCalledWith(makeFakeMessage());
  });
});
