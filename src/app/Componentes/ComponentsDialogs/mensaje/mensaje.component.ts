import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  descripcion: string;
  dolares: number;
  soles: number;

  constructor(public dialogRef: MatDialogRef<MensajeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.descripcion = this.data.mensaje;
    this.dolares = this.data.restad;
    this.soles = this.data.restas;
  }

  Cerrar() {
    this.dialogRef.close();
    this.descripcion = '';
    this.dolares = 0;
    this.soles = 0;
  }
}
