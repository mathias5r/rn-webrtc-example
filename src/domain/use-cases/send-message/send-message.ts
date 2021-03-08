export interface Message {
  type: string;
  payload: any;
}

export interface SendMessage {
  send: (message: Message) => void;
}
