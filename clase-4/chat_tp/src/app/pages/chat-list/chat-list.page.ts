import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { LastSeenPipe } from '../../pipes/last-seen.pipe';

@Component({
  standalone: true,
  selector: 'app-chat-list-page',
  imports: [RouterLink, ReactiveFormsModule, LastSeenPipe],
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.css']
})
export class ChatListPageComponent {
  constructor(public chatService: ChatService) {}

  search = new FormControl<string>('', { nonNullable: true });

  filteredChats = computed(() => {
    const q = this.search.value.trim().toLowerCase();
    const all = this.chatService.chats();
    if (!q) return all;
    return all.filter(c => c.name.toLowerCase().includes(q));
  });
}
