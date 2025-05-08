import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { UserRowComponent } from './user-row/user-row.component';
import { PostListComponent } from '../post-list/post-list.component';
import { PostService } from '@app/services/post/post.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [UserRowComponent, PostListComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
          transform: 'translateY(-10px)',
        }),
        animate(
          '300ms ease-out',
          style({
            height: '*',
            opacity: 1,
            transform: 'translateY(0)',
          })
        ),
      ]),
      transition(':leave', [
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
          transform: 'translateY(0)',
        }),
        animate(
          '200ms ease-out',
          style({
            height: '0',
            opacity: 0,
            transform: 'translateY(-10px)',
          })
        ),
      ]),
    ]),
  ],
})
export class UserListComponent implements OnInit {
  readonly userService = inject(UserService);
  readonly postService = inject(PostService);
  private readonly _expandedId = signal<number | null>(null);

  readonly expandedId = computed(() => this._expandedId());

  constructor() {
    effect(() => {
      const userId = this.expandedId();

      if (userId !== null) {
        this.postService.getPostsByUser(userId).subscribe();
      }
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe();
  }

  toggleRow(userId: number) {
    this._expandedId.update((id) => (id === userId ? null : userId));
  }
}
