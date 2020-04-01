import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { IPrescription } from '../../models/prescription.model';

@Component({
  selector: 'app-prescription-pictures',
  templateUrl: './prescription-pictures.component.html',
  styleUrls: ['./prescription-pictures.component.scss']
})
export class PrescriptionPicturesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PrescriptionPicturesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPrescription) { }

  imagePath = environment.imgUrl;
  selectedImg = '';

  ngOnInit(): void {
    this.selectedImg = this.data.images[0].fileName;
  }

}
