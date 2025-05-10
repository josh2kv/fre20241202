import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent implements OnInit {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly userService = inject(UserService);

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        tap((params) => {
          const page = params['page'] ? +params['page'] : 1;
          const pageSize = params['pageSize'] ? +params['pageSize'] : 10;

          this.userService.getUsers({ page, pageSize }).subscribe();
        })
      )
      .subscribe();
  }

  onPageSizeChange(pageSize: number | null) {
    this.router.navigate([], {
      queryParams: {
        pageSize: pageSize || 10,
        page: 1,
      },
    });
  }

  onNextPage() {
    this.router.navigate([], {
      queryParams: {
        page: this.userService.meta().page + 1,
      },
    });
  }

  onPreviousPage() {
    this.router.navigate([], {
      queryParams: {
        page: this.userService.meta().page - 1,
      },
    });
  }
}
