import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConexionService} from '../../../Servicios/conexion.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private conexion: ConexionService) {
  }

  ngOnInit() {
  }

  Extornar() {
    let formData;
    formData = new FormData();
    formData.append('accion', 'extornar');
    formData.append('id', this.data.id);
    this.conexion.servicio(formData).subscribe(
      mensaje => {
        Object.keys(mensaje).map((key) => {
          if (key === 'mensaje') {
            if (mensaje[key] === 'Extorno completado') {
              this.dialogRef.close();
              alert(mensaje[key]);
            }
          }
        });
      }
    );
  }

  Cerrar() {
    this.dialogRef.close();
  }
}
