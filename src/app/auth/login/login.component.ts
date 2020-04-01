import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';
import { ILogin } from '../../shared/models/login.model';
import { UiService } from '../../core/ui.service';
import { AutoUnsubscribe } from '../../shared/util-functions';

@AutoUnsubscribe
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  model: ILogin = {
    password: '',
    userName: ''
  };
  save = false;
  loading = false;
  subscriptions: Subscription[] = [];

  constructor(
    private uiService: UiService,
    private router: Router,
    private authService: AuthService) { }
  login() {
    this.loading = true;
    let sub = this.authService.login(this.model).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(res => {
      // 1- save data to local storage
      if (this.save)
        localStorage.setItem('token', res.token);
      // 2- set user data
      this.authService.user = res;
      this.authService.changeUserStatus(res.name);
      // 3- show snackbar
      let msg = 'کاربر: ' + res.name + '، خوش آمدید';
      this.uiService.showSuccessSnack(msg);
      // 4- redirect
      this.router.navigate(['/']);
    }, error => {
      let str = 'خطا به هنگام ورود. ';
      if (error?.status === 401)
        str = 'نام کاربری یا کلمه عبور اشتباه است';
      else if (error?.status === 403)
        str = 'شما مجاز به دسترسی به داشبورد نمی‌باشید';
      this.uiService.showErrorSnack(str);
      console.log(error);
    });
    this.subscriptions.push(sub);
  }
}
