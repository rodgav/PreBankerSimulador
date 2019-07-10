import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Transacciones} from '../../Modelos/Transacciones';
import {UsuarioService} from '../../Servicios/usuario.service';
import {ConexionService} from '../../Servicios/conexion.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MensajeComponent} from '../ComponentsDialogs/mensaje/mensaje.component';

@Component({
  selector: 'app-cuadre-caja',
  templateUrl: './cuadre-caja.component.html',
  styleUrls: ['./cuadre-caja.component.css']
})
export class CuadreCajaComponent implements OnInit {
  forms: FormGroup;
  formd: FormGroup;
  monto200 = 0;
  monto100 = 0;
  monto50 = 0;
  monto10 = 0;
  monto20 = 0;
  monto5 = 0;
  monto2 = 0;
  monto1 = 0;
  monto050 = 0;
  monto020 = 0;
  monto010 = 0;
  montod100 = 0;
  montod50 = 0;
  montod20 = 0;
  montod10 = 0;
  montod5 = 0;
  montod2 = 0;
  montod1 = 0;
  totals0 = 0;
  totald0 = 0;
  totals1 = 0;
  totald1 = 0;
  transacciones: Transacciones[];
  private entradass = 0;
  private entradassd = 0;
  private salidass = 0;
  private entradasds = 0;
  private totalds = 0;
  private salidassd = 0;
  private entradasd = 0;
  private salidasd = 0;
  private salidasds = 0;
  private totalsd = 0;

  constructor(private router: Router,
              private fb: FormBuilder,
              private fb2: FormBuilder,
              private usuario: UsuarioService,
              private conexion: ConexionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.forms = this.fb.group({
      cs200: ['', Validators.required],
      cs100: ['', Validators.required],
      cs50: ['', Validators.required],
      cs20: ['', Validators.required],
      cs10: ['', Validators.required],
      cs5: ['', Validators.required],
      cs2: ['', Validators.required],
      cs1: ['', Validators.required],
      cs050: ['', Validators.required],
      cs020: ['', Validators.required],
      cs010: ['', Validators.required]
    });
    this.formd = this.fb2.group({
      cd200: ['', Validators.required],
      cd100: ['', Validators.required],
      cd50: ['', Validators.required],
      cd20: ['', Validators.required],
      cd10: ['', Validators.required],
      cd5: ['', Validators.required],
      cd2: ['', Validators.required],
      cd1: ['', Validators.required]
    });
    this.Igualar();
  }

  private DialogMensaje() {
    let restas = 0;
    let restad = 0;
    if (this.totals0 > 0) {
      restas = -(this.totals0 - this.totals1);
      // console.log(restas);
    } else if (this.totals0 <= 0) {
      restas = (this.totals0 + this.totals1);
      // console.log(restas);
    }
    if (this.totald0 > 0) {
      restad = -(this.totald0 - this.totald1);
      // console.log(restad);
    } else if (this.totald0 <= 0) {
      restad = (this.totald0 + this.totald1);
      // console.log(restad);
    }
    const mensaje = '';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {restas, restad, mensaje};
    dialogConfig.width = '600px';
    dialogConfig.height = '210px';
    dialogConfig.hasBackdrop = true;
    this.dialog.open(MensajeComponent, dialogConfig);
  }

  Cancelar() {
    this.router.navigate(['inicio']);
  }

  CS200(event: any) {
    this.monto200 = event.target.value * 200;
    this.SumarS();
  }

  CS100(event: any) {
    this.monto100 = event.target.value * 100;
    this.SumarS();
  }

  CS20(event: any) {
    this.monto20 = event.target.value * 20;
    this.SumarS();
  }

  CS50(event: any) {
    this.monto50 = event.target.value * 50;
    this.SumarS();
  }

  CS10(event: any) {
    this.monto10 = event.target.value * 10;
    this.SumarS();
  }

  CS5(event: any) {
    this.monto5 = event.target.value * 5;
    this.SumarS();
  }

  CS2(event: any) {
    this.monto2 = event.target.value * 2;
    this.SumarS();
  }

  CS1(event: any) {
    this.monto1 = event.target.value;
    this.SumarS();
  }

  CS050(event: any) {
    this.monto050 = event.target.value * 0.50;
    this.SumarS();
  }

  CS020(event: any) {
    this.monto020 = event.target.value * 0.20;
    this.SumarS();
  }

  CS010(event: any) {
    this.monto010 = event.target.value * 0.10;
    this.SumarS();
  }

  CD100(event: any) {
    this.montod100 = event.target.value * 100;
    this.SumarD();
  }

  CD50(event: any) {
    this.montod50 = event.target.value * 50;
    this.SumarD();
  }

  CD20(event: any) {
    this.montod20 = event.target.value * 20;
    this.SumarD();
  }

  CD10(event: any) {
    this.montod10 = event.target.value * 10;
    this.SumarD();
  }

  CD2(event: any) {
    this.montod2 = event.target.value * 2;
    this.SumarD();
  }

  CD1(event: any) {
    this.montod1 = event.target.value;
    this.SumarD();
  }

  CD5(event: any) {
    this.montod5 = event.target.value * 5;
    this.SumarD();
  }

  private SumarS() {
    const sumas =
      +this.monto200 +
      +this.monto100 +
      +this.monto50 +
      +this.monto10 +
      +this.monto20 +
      +this.monto5 +
      +this.monto2 +
      +this.monto1 +
      +this.monto050 +
      +this.monto020 +
      +this.monto010;
    this.totals1 = Math.round(sumas * Math.pow(10, 2)) / Math.pow(10, 2);
    // this.Sumar();
  }

  private SumarD() {
    const sumad =
      +this.montod100 +
      +this.montod50 +
      +this.montod20 +
      +this.montod10 +
      +this.montod5 +
      +this.montod2 +
      +this.montod1;
    this.totald1 = Math.round(sumad * Math.pow(10, 2)) / Math.pow(10, 2);
    // this.Sumar();
  }

  /*private Sumar() {
    this.total = this.totals + this.totald;
  }*/
  private Igualar() {
    const formData = new FormData;
    formData.append('accion', 'realizados');
    formData.append('cajero', this.usuario.getUsuarioLogeadoen()[0]['id']);
    this.conexion.servicio(formData).subscribe(
      transacciones => {
        Object.keys(transacciones).map((key) => {
          if (key === 'transacciones') {
            this.transacciones = transacciones[key];
            this.LlenarTotalSD();
          }
        });
      }
    );
  }

  private LlenarTotalSD() {
    for (const row of this.transacciones) {
      if (row.idt !== '1500') {
        // entrada
        if (row.moneda === 'PEN' && (row.idt === '1710' || row.idt === '0610' || row.idt === '0900' || row.idt === '0901'
          || row.idt === '0902' || row.idt === '0903' || row.idt === '1910' || row.idt === '0813')) {
          this.entradass = +this.entradass + +row.monto;
          if ((row.idt === '0813')) {
            this.entradassd = +this.entradassd + +(row.monto / 3);
          }
          // salida
        } else if (row.moneda === 'PEN' && (row.idt === '1700' || row.idt === '0600' || row.idt === '1900' || row.idt === '0815')) {
          this.salidass = +this.salidass + +row.monto;
          if ((row.idt === '0815')) {
            this.salidassd = +this.salidassd + +(row.monto / 2);
          }
          // entrada
        } else if (row.moneda === 'USD' && (row.idt === '1710' || row.idt === '0610' || row.idt === '0900' || row.idt === '0901'
          || row.idt === '0902' || row.idt === '0903' || row.idt === '1910' || row.idt === '0813')) {
          this.entradasd = +this.entradasd + +row.monto;
          if ((row.idt === '0813')) {
            this.entradasds = +this.entradasds + +(row.monto * 2);
          }
          // salida
        } else if (row.moneda === 'USD' && (row.idt === '1700' || row.idt === '0600' || row.idt === '1900' || row.idt === '0815')) {
          this.salidasd = +this.salidasd + +row.monto;
          if ((row.idt === '0815')) {
            this.salidasds = +this.salidasds + +(row.monto * 3);
          }
        }
        this.totalsd = this.entradassd - this.salidassd;
        this.totalds = this.entradasds - this.salidasds;
        this.totald0 = (this.entradasd - this.salidasd) - this.totalsd;
        this.totals0 = (this.entradass - this.salidass) - this.totalds;
      }
    }
  }
}
