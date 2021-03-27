import React, { useState, useEffect } from 'react';
import { SocketReceiveMessage } from '../../data/use-cases/receive-message/socket-receive-message';
import { SocketSendMessage } from '../../data/use-cases/send-message/socket-send-message';
import { Message } from '../../domain/use-cases/send-message/send-message';
import { SocketIOAdapter } from '../../infra/socket/socket-io-adapter';
// import { App as AppComponent } from '../../presentation/app';
import { EventOnCandidate, RTCPeerConnection } from 'react-native-webrtc';
import { TextInput, TouchableOpacity } from 'react-native';

let isMaster = false;
const masterConnections: { [name: string]: any } = {};
const masterChannels: { [name: string]: any } = {};
let peerConnection: RTCPeerConnection;
let peerChannel;
let peerID: string;
const roomID = 'test-room';

const configuration = {
  iceServers: [
    {
      url: 'stun:stun.l.google.com:19302',
    },
  ],
};

const log = (message: string) => {
  if (isMaster) {
    console.log(`[MASTER]: ${message}`);
  } else {
    console.log(`[PEER]: ${message}`);
  }
};

const createAnswer = (
  socketSendMessage: SocketSendMessage,
  connection: RTCPeerConnection,
  args: any,
) => {
  console.log(connection.signalingState);
  connection
    .createAnswer()
    .then((desc) => {
      connection
        .setLocalDescription(desc)
        .then(() => {
          log(`Resposta criada, enviado para o peer: ${desc}`);
          socketSendMessage.send({
            type: 'answer',
            payload: { description: desc, ...args },
          });
        })
        .catch((err) => log(`Erro ao salvar descritor da resposta: ${err}`));
    })
    .catch((err) => log(`Erro ao criar resposta: ${err}`));
};

const messageHandler = (
  socketSendMessage: SocketSendMessage,
  message: Message,
): void => {
  switch (message.type) {
    case 'offer': {
      log(`recebi uma oferta -> ${JSON.stringify(message.payload)}`);
      const { peer, description } = message.payload;
      if (isMaster) {
        const connection: RTCPeerConnection = masterConnections[peer];
        connection.setRemoteDescription(description);
        createAnswer(socketSendMessage, connection, {
          roomID,
          peer,
        });
      } else {
        peerConnection.setRemoteDescription(description);
        createAnswer(socketSendMessage, peerConnection, {
          roomID,
          peer,
        });
      }
      break;
    }
    case 'answer': {
      log(`recebi uma resposta -> ${JSON.stringify(message.payload)}`);
      const { peer, description } = message.payload;
      if (isMaster) {
        const connection: RTCPeerConnection = masterConnections[peer];
        connection.setRemoteDescription(description);
      } else {
        peerConnection.setRemoteDescription(description);
      }
      break;
    }
    case 'candidate':
      // log(`recebi um candidato -> ${JSON.stringify(message.payload)}`);
      const { peer, candidate } = message.payload;
      if (isMaster) {
        const connection: RTCPeerConnection = masterConnections[peer];
        connection.addIceCandidate(candidate);
      } else {
        peerConnection.addIceCandidate(candidate);
      }
      break;
    case 'created': {
      log(`sala criada' -> ${JSON.stringify(message.payload)}`);
      isMaster = true;
      break;
    }
    case 'joined': {
      log(`entrei na sala -> ${JSON.stringify(message.payload)}`);
      isMaster = false;
      peerID = message.payload.socketID;
      createPeerConnection(socketSendMessage);
      break;
    }
    case 'full': {
      log('sala está cheia');
      break;
    }
    case 'ready': {
      log(`pronto para conexão -> ${JSON.stringify(message.payload)}`);
      createMasterConnection(socketSendMessage, message.payload.peer);
      break;
    }
    default:
      break;
  }
};

const onIceCandidate = (peer: string, socketSendMessage: SocketSendMessage) => (
  event: EventOnCandidate,
) => {
  // log(
  //   `há um novo candidato: ${JSON.stringify(
  //     event.candidate,
  //   )}, mandando para o peer`,
  // );
  if (event.candidate) {
    socketSendMessage.send({
      type: 'candidate',
      payload: {
        candidate: event.candidate,
        roomID,
        peer,
      },
    });
    return;
  }
  log('Fim dos meus candidatos');
};

const createMasterConnection = (
  socketSendMessage: SocketSendMessage,
  peer: string,
) => {
  const connection = new RTCPeerConnection(configuration);
  masterConnections[peer] = connection;
  connection.onicecandidate = onIceCandidate(peer, socketSendMessage);
  const channel = 'text';
  const dataChannel: any = connection.createDataChannel(channel);
  masterChannels[peer] = dataChannel;
  dataChannel.onopen = () => {
    console.log('[MASTER] data channel opened');
  };
  dataChannel.onmessage = (event: any) => {
    console.log('[MASTER] message', event.data);
  };
  connection.onnegotiationneeded = () => {
    console.log('[MASTER] onnegotiationneeded');
    connection.createOffer().then((desc) => {
      connection
        .setLocalDescription(desc)
        .then(() => {
          log(`Oferta criada, salvando descritor local: ${desc}`);
          socketSendMessage.send({
            type: 'offer',
            payload: { roomID, description: desc, peer },
          });
        })
        .catch((error) => log(`Erro ao criar sessão local: ${error}`));
    });
  };

  connection.oniceconnectionstatechange = (event) => {
    console.log('[MASTER ]oniceconnectionstatechange', event.target.iceConnectionState);
  };

  connection.onsignalingstatechange = (event) => {
    console.log('[MASTER] onsignalingstatechange', event.target.signalingState);
  };
};

const createPeerConnection = (socketSendMessage: SocketSendMessage) => {
  const connection = new RTCPeerConnection(configuration);
  peerConnection = connection;
  connection.onicecandidate = onIceCandidate(peerID, socketSendMessage);
  connection.ondatachannel = (event: any) => {
    peerChannel = event.channel;
    peerChannel.onopen = () => console.log('[PEER] data channel opened');
    peerChannel.onclose = () => console.log('[PEER] data channel closed');
    peerChannel.onmessage = (e: any) => console.log('message', e.data);
  };
  connection.onsignalingstatechange = (event) => {
    console.log('[PEER] onsignalingstatechange', event.target.signalingState);
  };
};

const sendMessage = (message: string) => {
  if (isMaster) {
    Object.keys(masterChannels).forEach((key) => {
      console.log(masterChannels[key])
      masterChannels[key].send(message);
    });
    return;
  }
  peerChannel.send(message);
};

const App: React.FC = () => {
  // const [roomID] = useState(
  //   Math.floor((1 + Math.random()) * 1e16)
  //     .toString(16)
  //     .substring(1),
  // );

  const [text, setText] = useState('');

  const socketAdapter = new SocketIOAdapter();
  const socketSendMessage = new SocketSendMessage(socketAdapter);
  const socketReceiveMessage = new SocketReceiveMessage(socketAdapter);
  socketReceiveMessage.receive((message: Message) =>
    messageHandler(socketSendMessage, message),
  );

  useEffect(() => {
    socketSendMessage.send({
      type: 'create_or_join',
      payload: {
        roomID,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TextInput onChangeText={(v) => setText(v)} value={text} />
      <TouchableOpacity
        style={{ height: 40, width: 100, backgroundColor: 'red', alignSelf: 'center' }}
        onPress={() => sendMessage(text)}
      />
    </>
  );
};

export default App;
