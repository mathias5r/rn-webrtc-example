/* eslint-disable no-new */
import React, { useEffect } from 'react';
// import { SocketReceiveMessage } from '../../data/use-cases/receive-message/socket-receive-message';
// import { SocketSendMessage } from '../../data/use-cases/send-message/socket-send-message';
// import { Message } from '../../domain/use-cases/send-message/send-message';
import { SocketIOAdapter } from '../../infra/socket/socket-io-adapter';
// import { App as AppComponent } from '../../presentation/app';
import { WebRTCSendMessage } from '../../data/use-cases/send-message/webrtc-send-message';
import { WebRTCAdapter } from '../../infra/webrtc/webrtc-adapter';

const App: React.FC = () => {
  useEffect(() => {
    const messageTypes = [
      'answer',
      'candidate',
      'connect',
      'connect_error',
      'created',
      'disconnect',
      'error',
      'full',
      'joined',
      'offer',
      'ready',
    ];
    const socketAdapter = new SocketIOAdapter(messageTypes);
    const webRTCAdapter = new WebRTCAdapter(socketAdapter, socketAdapter);
    new WebRTCSendMessage(webRTCAdapter);
  });

  return null;
};

export default App;
