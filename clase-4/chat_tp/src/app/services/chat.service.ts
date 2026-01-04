import { Injectable, computed, signal } from '@angular/core';
import { Chat } from '../models/chat.model';
import { Message } from '../models/message.model';

function nowMinusMs(ms: number) {
  return new Date(Date.now() - ms);
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private _chats = signal<Chat[]>([
    {
      id: 1,
      name: 'Elmo',
      avatarUrl: 'assets/avatars/elmo.png',
      online: true,
      lastSeenLabel: 'Hace 2 horas'
    },
    {
      id: 2,
      name: 'Oscar el Gruñón',
      avatarUrl: 'assets/avatars/oscar.webp',
      online: false,
      lastSeenLabel: 'Hace 7 minutos'
    },
    {
      id: 3,
      name: 'Monstruo Galletas',
      avatarUrl: 'assets/avatars/cookie.webp',
      online: true,
      lastSeenLabel: ' '
    },
    {
      id: 4,
      name: 'Abelardo',
      avatarUrl: 'assets/avatars/bird.jpg',
      online: false,
      lastSeenLabel: 'Hace 10 horas'
    },
    {
      id: 5,
      name: 'Conde Contar',
      avatarUrl: 'assets/avatars/conde.png',
      online: true,
      lastSeenLabel: ' '
    },
    {
      id: 6,
      name: 'Beto',
      avatarUrl: 'assets/avatars/beto.webp',
      online: false,
      lastSeenLabel: '24 dic'
    }
  ]);

  private _messages = signal<Message[]>([
    {
      id: 1,
      chatId: 1,
      from: 'user',
      text: 'Hola Elmo, ¿Cómo estás?',
      createdAt: nowMinusMs(120_000)
    },
    {
      id: 2,
      chatId: 1,
      from: 'app',
      text: 'Elmo le pidió ayuda a la IA para diseñar los css',
      createdAt: nowMinusMs(60_000)
    },
    {
      id: 3,
      chatId: 1,
      from: 'app',
      text: 'Como se recomendó en clase :)',
      createdAt: nowMinusMs(30_000)
    }
  ]);


  private _selectedChatId = signal<number | null>(1);

  chats = computed(() => this._chats());
  selectedChatId = computed(() => this._selectedChatId());
  selectedChat = computed(() => {
    const id = this._selectedChatId();
    return this._chats().find(c => c.id === id) ?? null;
  });

  private setChatOnline(chatId: number, online: boolean) {
    this._chats.update(chats =>
      chats.map(c =>
        c.id === chatId
          ? {
              ...c,
              online,
              lastSeenLabel: online ? '—' : 'just now'
            }
          : c
      )
    );
  }

  selectedMessages = computed(() => {
    const id = this._selectedChatId();
    if (!id) return [];
    return this._messages()
      .filter(m => m.chatId === id)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  });

  selectChat(id: number) {
    this._selectedChatId.set(id);
  }

  getChatById(id: number): Chat | null {
    return this._chats().find(c => c.id === id) ?? null;
  }

  getMessagesByChatId(chatId: number): Message[] {
    return this._messages()
      .filter(m => m.chatId === chatId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  createChat(name: string, online: boolean) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const nextId = Math.max(0, ...this._chats().map(c => c.id)) + 1;

    const newChat: Chat = {
      id: nextId,
      name: trimmed,
      avatarUrl: 'assets/avatars/ernesto.jpg', 
      online,
      lastSeenLabel: online ? ' ' : 'Ahora'
    };
    this._chats.update(list => [newChat, ...list]);
  }

  sendUserMessage(chatId: number, text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const nextId = (this._messages().at(-1)?.id ?? 0) + 1;

    const userMsg: Message = {
      id: nextId,
      chatId,
      from: 'user',
      text: trimmed,
      createdAt: new Date()
    };

    this._messages.update(list => [...list, userMsg]);
    setTimeout(() => {
      this.setChatOnline(chatId, true);
      this.sendAutoReply(chatId);
    }, 900);
  }

  private sendAutoReply(chatId: number) {
    const nextId = (this._messages().at(-1)?.id ?? 0) + 1;

    const chat = this._chats().find(c => c.id === chatId);
    const name = chat?.name ?? 'El contacto';

    const replies = [
      `${name} sabe dónde vives`,
      `¿Quieres besar a quien hace la voz de ${name}?`,
      `Deja de tocarme ${name}`,
      `${name} no está disponible en este momento.`,
      `Mensaje recibido. ${name} está pensando...`,
      `${name} está ocupado viendo Plaza Sésamo.`,
      `${name} le pidió ayuda a la IA para diseñar los css`,
    ];

    const randomIndex = Math.floor(Math.random() * replies.length);
    const replyText = replies[randomIndex];

    const appMsg: Message = {
      id: nextId,
      chatId,
      from: 'app',
      text: replyText,
      createdAt: new Date()
    };

    this._messages.update(list => [...list, appMsg]);
  }
}
