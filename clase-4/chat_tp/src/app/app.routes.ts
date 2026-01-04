import { Routes } from '@angular/router';
import { ChatListPageComponent } from './pages/chat-list/chat-list.page';
import { ChatDetailPageComponent } from './pages/chat-detail/chat-detail.page';
import { NewChatPageComponent } from './pages/new-chat/new-chat.page';

export const routes: Routes = [
  { path: 'chats', component: ChatListPageComponent },
  { path: 'chats/:id', component: ChatDetailPageComponent },
  { path: 'nuevo', component: NewChatPageComponent },
  { path: '', redirectTo: 'chats/1', pathMatch: 'full' },
  { path: '**', redirectTo: 'chats/1' }
];
