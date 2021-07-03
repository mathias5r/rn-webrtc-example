/* eslint-disable no-new */
import React, { useEffect } from 'react';
// import { SocketReceiveMessage } from '../../data/use-cases/receive-message/socket-receive-message';
// import { SocketSendMessage } from '../../data/use-cases/send-message/socket-send-message';
// import { Message } from '../../domain/use-cases/send-message/send-message';
import { WebRTC } from '@/data/use-cases/webrtc/webrtc';
// import { App as AppComponent } from '../../presentation/app';
import { SocketIOAdapter } from '@/infra/socket/socket-io-adapter';
import { WebRTCAdapter } from '@/infra/webrtc/webrtc-adapter';

import { WebRTCMessageType } from '@/utils/enums';

const App: React.FC = () => {
  useEffect(() => {
    const socketAdapter = new SocketIOAdapter(Object.values(WebRTCMessageType));
    const webRTCAdapter = new WebRTCAdapter(socketAdapter, socketAdapter);
    new WebRTC(webRTCAdapter);
  });

  return null;
};

export default App;
