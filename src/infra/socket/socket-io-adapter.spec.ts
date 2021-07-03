import { io } from 'socket.io-client';

import { SocketIOAdapter } from './socket-io-adapter';

jest.mock('socket.io-client', () => ({
  io: jest.fn().mockReturnValue({
    emit: jest.fn(),
    on: jest
      .fn()
      .mockImplementation((_: string, callback: any) => callback({})),
  }),
}));

const makeSut = (): SocketIOAdapter => {
  const messageTypes = ['disconnect', 'connect', 'error', 'connect_error'];
  return new SocketIOAdapter(messageTypes);
};

const makeFakeMessage = () => ({
  type: 'song',
  payload: {
    instrument: 'Piano',
    note: 'A',
  },
});

describe('SocketIOAdapter', () => {
  let socket: any;

  beforeEach(() => {
    socket = io();
  });

  it('Should call emit with correct values', () => {
    const sut = makeSut();
    const message = makeFakeMessage();
    sut.send(message);
    expect(socket.emit).toHaveBeenCalledWith(message.type, message.payload);
  });

  it('Should call on with correct values', () => {
    const sut = makeSut();
    const callback = jest.fn();
    sut.receive(callback);
    expect(socket.on).toHaveBeenNthCalledWith(
      1,
      'disconnect',
      expect.any(Function),
    );
    expect(socket.on).toHaveBeenNthCalledWith(
      2,
      'connect',
      expect.any(Function),
    );
    expect(socket.on).toHaveBeenNthCalledWith(3, 'error', expect.any(Function));
    expect(socket.on).toHaveBeenNthCalledWith(
      4,
      'connect_error',
      expect.any(Function),
    );
  });
});
