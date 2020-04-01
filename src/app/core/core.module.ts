import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { AuthInterceptorProvider } from './token-interceptor';
import { UiService } from './ui.service';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UiService,
    DataService,
    AuthInterceptorProvider
  ]
})
export class CoreModule { }
