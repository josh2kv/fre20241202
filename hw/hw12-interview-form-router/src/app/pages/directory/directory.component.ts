import { DummyUsersService } from '@/core/services/dummy-users.service';
import { User } from '@/shared/interfaces/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directory',
  standalone: false,

  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss',
})
export class DirectoryComponent implements OnInit {
  users: User[] = [];
  loading = false;
  errorMessage = '';

  constructor(private dummyUsersService: DummyUsersService) {}

  ngOnInit(): void {
    this.loading = true;
    this.dummyUsersService.getUsers().subscribe({
      next: (users) => {
        console.log('users', users);
        this.users = users;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to fetch users.';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
