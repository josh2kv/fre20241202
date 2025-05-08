import { Component, input } from '@angular/core';
import { Post } from '@app/services/post/post.service';

@Component({
  selector: 'app-post-list',
  imports: [],
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  posts = input.required<Post[]>();
  loading = input.required<boolean>();
}
