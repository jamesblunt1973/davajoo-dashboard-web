import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../core/auth.guard';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {
    path: '', component: ContainerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'prescriptions',
        loadChildren: () => import('../prescriptions/prescriptions.module').then(m => m.PrescriptionsModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      }
    ]
  }
];

@NgModule({
  declarations: [
    ContainerComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
