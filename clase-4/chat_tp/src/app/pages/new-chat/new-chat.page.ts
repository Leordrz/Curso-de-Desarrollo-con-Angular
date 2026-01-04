import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  standalone: true,
  selector: 'app-new-chat-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.css']
})
export class NewChatPageComponent {
  constructor(private chatService: ChatService, private router: Router) {}

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    online: new FormControl<boolean>(true, { nonNullable: true })
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, online } = this.form.getRawValue();
    this.chatService.createChat(name, online);
    this.router.navigateByUrl('/chats');
  }
}
