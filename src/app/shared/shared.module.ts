import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CounterComponent } from './components/counter/counter.component';
import { DigitComponent } from './components/counter/digit/digit.component';
import { PagerComponent } from './components/pager/pager.component';
import { MaterialComponentsModule } from './material.module';
import { MomentJalaaliPipe } from './moment-jalaali.pipe';
import { PrescriptionPicturesComponent } from './components/prescription-pictures/prescription-pictures.component';


@NgModule({
  declarations: [CounterComponent,
    DigitComponent,
    PagerComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    MomentJalaaliPipe,
    PrescriptionPicturesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialComponentsModule
  ],
  providers: [],
  exports: [
    CommonModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CounterComponent,
    PagerComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    MomentJalaaliPipe
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AlertDialogComponent
  ]
})
export class SharedModule { }
