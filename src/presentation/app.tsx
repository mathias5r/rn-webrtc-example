import React, { useEffect } from 'react';
import { View } from 'react-native';

import {
  Message,
  SendMessage,
} from '../domain/use-cases/send-message/send-message';

interface AppProps {
  sendMessage: SendMessage;
}

export const App: React.FC<AppProps> = ({ sendMessage }) => {
  useEffect(() => {
    const message: Message = {
      type: 'song',
      payload: {
        instrument: 'piano',
        note: 'A',
      },
    };
    sendMessage.send(message);
  }, [sendMessage]);

  return <View />;
};
