import { io } from 'socket.io-client';
import { SocketIOAdapter } from './socket-io-adapter';

jest.mock('socket.io-client', () => ({
  io: jest.fn().mockReturnValue({
    emit: jest.fn(),
    on: jest.fn(),
  }),
}));

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
    const sut = new SocketIOAdapter();
    const message = makeFakeMessage();
    sut.send(message);
    expect(socket.emit).toHaveBeenCalledWith(message.type, message.payload);
  });
});
