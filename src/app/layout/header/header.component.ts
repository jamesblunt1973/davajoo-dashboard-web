import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuStatus = '';
  userName = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsername().subscribe(un => {
      this.userName = un;
    });
  }

  logout() {
    this.authService.logout();
  }
}
