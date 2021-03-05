import React from 'react';
import { SocketSendMessage } from '../../data/use-cases/send-message/socket-send-message';
import { SocketIOAdapter } from '../../infra/socket/socket-io-adapter';
import { App as AppComponent } from '../../presentation/App';

const App: React.FC = () => {
  const socketSender = new SocketIOAdapter();
  const socketSendMessage = new SocketSendMessage(socketSender);
  return <AppComponent sendMessage={socketSendMessage} />;
};

export default App;
