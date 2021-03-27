import React from 'react';
import { SocketReceiveMessage } from '../../data/use-cases/receive-message/socket-receive-message';
import { SocketSendMessage } from '../../data/use-cases/send-message/socket-send-message';
import { Message } from '../../domain/use-cases/send-message/send-message';
import { SocketIOAdapter } from '../../infra/socket/socket-io-adapter';
import { App as AppComponent } from '../../presentation/app';

const App: React.FC = () => {
  const messageTypes = ['disconnect', 'connect', 'error', 'connect_error'];
  const socketAdapter = new SocketIOAdapter(messageTypes);
  const socketSendMessage = new SocketSendMessage(socketAdapter);
  const socketReceiveMessage = new SocketReceiveMessage(socketAdapter);
  socketReceiveMessage.receive((message: Message) => console.log(message));
  return <AppComponent sendMessage={socketSendMessage} />;
};

export default App;
