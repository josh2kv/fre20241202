import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { User } from '@app/services/user/user.service';

@Component({
  selector: 'tr[app-user-row]',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-row.component.html',
  styleUrl: './user-row.component.css',
})
export class UserRowComponent {
  user = input.required<User>();
  expanded = input.required<boolean>();

  onExpand = output<void>();
}
