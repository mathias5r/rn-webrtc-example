import { Socket } from './socket';

import { Message } from '@/domain/use-cases/send-message/send-message';

import { SocketReceiver } from '@/data/protocols/socket/socket-receiver';
import { SocketSender } from '@/data/protocols/socket/socket-sender';

const makeSocketReceiverStub = (): SocketReceiver => {
  class SocketReceiverStub implements SocketReceiver {
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
  return new SocketReceiverStub();
};

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
  socketSut: Socket;
  socketReceiverStub: SocketReceiver;
  socketSenderStub: SocketSender;
}

const makeSut = (): SutTypes => {
  const socketReceiverStub = makeSocketReceiverStub();
  const socketSenderStub = makeSocketSenderStub();
  const socketSut = new Socket(socketReceiverStub, socketSenderStub);
  return {
    socketSut,
    socketReceiverStub,
    socketSenderStub,
  };
};

describe('Socket', () => {
  it('Should call receive with correct values', () => {
    const callback = jest.fn();
    const { socketSut, socketReceiverStub } = makeSut();
    const receiveSpy = jest.spyOn(socketReceiverStub, 'receive');
    socketSut.receive(callback);
    expect(receiveSpy).toHaveBeenCalledWith(callback);
  });
  it('Should call SocketSender with correct values', () => {
    const { socketSenderStub, socketSut } = makeSut();
    const sendSpy = jest.spyOn(socketSenderStub, 'send');
    socketSut.send(makeFakeMessage());
    expect(sendSpy).toHaveBeenCalledWith(makeFakeMessage());
  });
});
