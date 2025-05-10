import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userService.getUsers({
        page: params['page'] || 1,
        pageSize: params['pageSize'] || 10,
      });
    });
  }
}
