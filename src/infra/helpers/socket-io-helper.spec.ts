import { SocketIOHelper } from './socket-io-helper';
import { io } from 'socket.io-client';

jest.mock('socket.io-client', () => ({
  io: jest.fn().mockReturnValue({
    emit: jest.fn(),
    on: jest.fn(),
  }),
}));

describe('SocketIOHelper', () => {
  it('Should call io just in the first time', () => {
    SocketIOHelper.getInstance();
    expect(io).toHaveBeenCalled();
    jest.clearAllMocks();
    SocketIOHelper.getInstance();
    expect(io).not.toHaveBeenCalled();
  });
});
