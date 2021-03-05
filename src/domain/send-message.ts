export interface Message {
  instrument: string;
  note: string;
}

export interface SendMessage {
  send: (message: Message) => Promise<void>;
}
