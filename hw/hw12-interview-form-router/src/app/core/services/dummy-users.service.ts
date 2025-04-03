import { ResData, ResUser, User } from '@/shared/interfaces/users';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DummyUsersService {
  baseUrl = 'https://randomuser.me/api';
  count = 10;
  nationality = 'us';
  include = ['login', 'name', 'email', 'picture'].join(',');
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const params = new HttpParams({
      fromObject: {
        results: this.count,
        nat: this.nationality,
        inc: this.include,
      },
    });

    return this.http
      .get<ResData<ResUser>>(this.baseUrl, {
        params,
      })
      .pipe(
        map((res) => {
          return res.results.map((u) => ({
            id: u.login.uuid,
            fullName: `${u.name.last} ${u.name.first}`,
            email: `${u.email}`,
            profileUrl: u.picture.large,
          }));
        })
      );
  }
}
