import React, { useEffect } from 'react';
import { View } from 'react-native';

import { Message, SendMessage } from '../domain/send-message';

interface AppProps {
  sendMessage: SendMessage;
}

export const App: React.FC<AppProps> = ({ sendMessage }) => {
  useEffect(() => {
    const message: Message = {
      instrument: 'piano',
      note: 'A',
    };
    sendMessage.send(message);
  }, [sendMessage]);

  return <View />;
};
