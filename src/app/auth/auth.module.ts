import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  declarations: [LoginComponent, LayoutComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
