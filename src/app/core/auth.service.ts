import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ILogin } from '../shared/models/login.model';
import { IUser } from '../shared/models/user.model';


@Injectable()
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  login(data: ILogin) {
    return this.http.post<IUser>(environment.apiUrl + 'auth/login', data);
  }

  register(data: ILogin) {
    return this.http.post(environment.apiUrl + 'auth/register', data);
  }

  private userStatus = new BehaviorSubject<string>('');
  user: IUser = null;

  changeUserStatus(un: string) {
    this.userStatus.next(un);
  }

  getUsername(): Observable<string> {
    return this.userStatus.asObservable();
  }

  checkUser(): boolean | Observable<boolean> {
    if (this.user)
    {
      this.changeUserStatus(this.user.name);
      return true;
    }

    let token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['auth/login']);
      return false;
    }

    return this.http.get<IUser>(environment.apiUrl + 'auth/check-user').pipe(
      map(res => {
        if (res && res.name) {
          localStorage.setItem('token', res.token);
          this.user = res;
          this.changeUserStatus(res.name);
          return true;
        }
        else {
          localStorage.removeItem('token');
          this.router.navigate(['auth/login']);
          return false;
        }
      })
    );
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  logout() {
    localStorage.removeItem('token');
    this.changeUserStatus(null);
    this.router.navigate(['auth/login']);
  }
}
