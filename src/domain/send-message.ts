export interface Message {
  instrument: string;
  node: string;
}

export interface SendMessage {
  send: (message: Message) => Promise<void>;
}
