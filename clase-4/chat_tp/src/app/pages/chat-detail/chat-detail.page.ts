import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  signal,
  ViewChild
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { LastSeenPipe } from '../../pipes/last-seen.pipe';
import { ChatService } from '../../services/chat.service';

@Component({
  standalone: true,
  selector: 'app-chat-detail-page',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, LastSeenPipe],
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.css']
})
export class ChatDetailPageComponent {
  private sub?: Subscription;

  @ViewChild('messagesContainer')
  private messagesContainer?: ElementRef<HTMLDivElement>;

  activeChatId = signal<number>(1);
  searchQuery = signal<string>('');

  text = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(300)]
  });

  filteredChats = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const all = this.chatService.chats();
    if (!q) return all;
    return all.filter(c => c.name.toLowerCase().includes(q));
  });

  activeChat = computed(() => this.chatService.getChatById(this.activeChatId()));

  messages = computed(() => {
    const chat = this.activeChat();
    if (!chat) return [];
    return this.chatService.getMessagesByChatId(chat.id);
  });

  constructor(private route: ActivatedRoute, public chatService: ChatService) {
    effect(() => {
      this.activeChatId();
      this.messages();
      this.scrollToBottomSoon();
    });
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(pm => {
      const id = Number(pm.get('id'));
      if (!Number.isNaN(id)) {
        this.activeChatId.set(id);
        this.chatService.selectChat(id);
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  onSearchInput(value: string) {
    this.searchQuery.set(value);
  }

  send() {
    if (this.text.invalid) {
      this.text.markAsTouched();
      return;
    }

    const chat = this.activeChat();
    if (!chat) return;

    this.chatService.sendUserMessage(chat.id, this.text.value);

    this.text.setValue('');
    this.text.markAsUntouched();
    this.scrollToBottomSoon();
  }
  private scrollToBottom() {
    const el = this.messagesContainer?.nativeElement;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }
  private scrollToBottomSoon() {
    requestAnimationFrame(() => {
      this.scrollToBottom();
      requestAnimationFrame(() => this.scrollToBottom());
    });
  }
}
