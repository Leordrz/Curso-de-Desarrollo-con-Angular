export interface Message {
  id: number;
  chatId: number;
  from: 'user' | 'app';
  text: string;
  createdAt: Date;
}

