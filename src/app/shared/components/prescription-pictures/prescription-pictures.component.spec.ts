import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionPicturesComponent } from './prescription-pictures.component';

describe('PrescriptionPicturesComponent', () => {
  let component: PrescriptionPicturesComponent;
  let fixture: ComponentFixture<PrescriptionPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
