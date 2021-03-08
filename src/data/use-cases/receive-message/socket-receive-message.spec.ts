import { SocketReceiveMessage } from './socket-receive-message';
import { SocketReceiver } from '../../protocols/socket/socket-receiver';
import { Message } from '../../../domain/use-cases/send-message/send-message';

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

interface SutTypes {
  receiveMessageSut: SocketReceiveMessage;
  socketReceiverStub: SocketReceiver;
}

const makeSut = (): SutTypes => {
  const socketReceiverStub = makeSocketReceiverStub();
  const receiveMessageSut = new SocketReceiveMessage(socketReceiverStub);
  return {
    receiveMessageSut,
    socketReceiverStub,
  };
};

describe('SocketReceiveMessage', () => {
  it('Should call receive with correct values', () => {
    const callback = jest.fn();
    const { receiveMessageSut, socketReceiverStub } = makeSut();
    const receiveSpy = jest.spyOn(socketReceiverStub, 'receive');
    receiveMessageSut.receive(callback);
    expect(receiveSpy).toHaveBeenCalledWith(callback);
  });
});
