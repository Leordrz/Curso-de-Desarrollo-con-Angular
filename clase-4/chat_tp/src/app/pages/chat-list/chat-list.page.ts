import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LastSeenPipe } from '../../pipes/last-seen.pipe';
import { ChatService } from '../../services/chat.service';

@Component({
  standalone: true,
  selector: 'app-chat-list-page',
  imports: [CommonModule, RouterLink, LastSeenPipe],
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.css']
})
export class ChatListPageComponent {
  constructor(public chatService: ChatService) {}

  // Buscador reactivo real (signals)
  searchQuery = signal<string>('');

  filteredChats = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const all = this.chatService.chats();
    if (!q) return all;
    return all.filter(c => c.name.toLowerCase().includes(q));
  });

  onSearchInput(value: string) {
    this.searchQuery.set(value);
  }
}
