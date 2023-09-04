interface Message {
  role: string;
  name: string;
  content: string;
}

export interface Request {
  messages: Message[];
}

export interface Response {
  generatedRespinseId: number;
  message: string;
}
