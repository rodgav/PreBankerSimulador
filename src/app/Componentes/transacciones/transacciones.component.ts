import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Tipos} from '../../Modelos/Tipos';
import {ConexionService} from '../../Servicios/conexion.service';
import {UsuarioService} from '../../Servicios/usuario.service';
import {Observable} from 'rxjs';
import {startWith} from 'rxjs/internal/operators/startWith';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {
  form: FormGroup;
  monedasfilter: Observable<any[]>;
  monedas: Tipos[];
  private tamano: number;
  idcuentav: boolean;
  nombrev: boolean;
  private formSubmitAttempt: boolean;
  precio: number;
  total: string;
  titulo: string;
  preciov: boolean;
  totalv: boolean;
  val: string;
  @ViewChild('cuentaf') cuentaf: ElementRef;
  @ViewChild('importef') importef: ElementRef;
  @ViewChild('monedaf') monedaf: ElementRef;
  private total0 = 0;

  constructor(private fb: FormBuilder,
              private rutaActiva: ActivatedRoute,
              private router: Router,
              private conexion: ConexionService,
              private usuario: UsuarioService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.idcuentav = true;
    this.nombrev = true;
    this.preciov = true;
    this.totalv = true;
    this.form = this.fb.group({
      idcuenta: ['', Validators.required],
      nombre: ['', Validators.required],
      monto: ['', Validators.required],
      idmoneda: ['', Validators.required]
    });
    this.Definidor(this.rutaActiva.snapshot.params.id);
    // console.log(this.rutaActiva.snapshot.params.id);
    this.form.get('nombre').disable();
    this.LlenarMonedas();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  private RealizarOp(idmoneda: string, idoperacion: string) {
    let monto;
    let idmoneda1;
    if (idmoneda === '1' && idoperacion === '0813') {
      monto = this.form.get('monto').value;
      idmoneda1 = '1';
    } else if (idmoneda === '2' && idoperacion === '0813') {
      monto = this.total0;
      idmoneda1 = '1';
    } else if (idmoneda === '1' && idoperacion === '0815') {
      monto = this.form.get('monto').value;
      idmoneda1 = '1';
    } else if (idmoneda === '2' && idoperacion === '0815') {
      monto = this.total0;
      idmoneda1 = '1';
    } else {
      monto = this.form.get('monto').value;
      idmoneda1 = idmoneda;
    }
    console.log(monto);
    let formData;
    formData = new FormData();
    formData.append('idtrans', this.rutaActiva.snapshot.params.id);
    formData.append('cajero', this.usuario.getUsuarioLogeadoen()[0]['id']);
    formData.append('idcuenta', this.form.get('idcuenta').value);
    formData.append('idmoneda', idmoneda1);
    formData.append('monto', monto);
    formData.append('accion', 'realizarop');
    this.conexion.servicio(formData).subscribe(
      mensaje => {
        Object.keys(mensaje).map((key) => {
          if (key === 'mensaje') {
            if (mensaje[key] === 'Realizado correctamente') {
              alert(mensaje[key]);
              location.reload();
              this.router.navigate(['inicio']);
            }
          }
        });
      }
    );
  }

  Cancelar() {
    this.router.navigate(['inicio']);
  }

  LlenarMonedas() {
    let formData;
    formData = new FormData();
    formData.append('accion', 'monedas');
    this.conexion.servicio(formData).subscribe(
      monedas => {
        Object.keys(monedas).map((key) => {
          if (key === 'monedas') {
            this.monedas = monedas[key];
            this.monedasfilter = this.form.get('idmoneda').valueChanges
              .pipe(
                startWith(''),
                map(value => this._filter(value))
              );
          }
        });
      }
    );
  }

  private _filter(value: string): any[] {
    return this.monedas.filter(item => item.nombre.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  Controlar(event: any) {
    const value = event.target.value;
    if (this.tamano === 17) {
      if (value.length === 0) {
        this.form.patchValue({
          idcuenta: [''],
          nombre: ['']
        });
      } else if (value.length === 3) {
        // console.log([value.slice(0, 3), '-', value.slice(3)].join(''));
        this.form.patchValue({
          idcuenta: [value.slice(0, 3), '-', value.slice(3)].join('')
        });
      } else if (value.length === 12) {
        this.form.patchValue({
          idcuenta: [value.slice(0, 12), '-', value.slice(12)].join('')
        });
      } else if (value.length === 14) {
        this.form.patchValue({
          idcuenta: [value.slice(0, 14), '-', value.slice(14)].join('')
        });
      } else if (value.length === this.tamano) {
        this.form.get('idcuenta').disable();
        this.BuscarNombre(value, 'cuentaa');
      } else if (value.length > 17) {
        alert('El numero ingresado no corresponde a una cuenta de ahorros');
      }
    } else if (this.tamano === 16) {
      if (value.length === 0) {
        this.form.patchValue({
          idcuenta: [''],
          nombre: ['']
        });
      } else if (value.length === 3) {
        // console.log([value.slice(0, 3), '-', value.slice(3)].join(''));
        this.form.patchValue({
          idcuenta: [value.slice(0, 3), '-', value.slice(3)].join('')
        });
      } else if (value.length === 11) {
        this.form.patchValue({
          idcuenta: [value.slice(0, 11), '-', value.slice(11)].join('')
        });
      } else if (value.length === 13) {
        this.form.patchValue({
          idcuenta: [value.slice(0, 13), '-', value.slice(13)].join('')
        });
      } else if (value.length === this.tamano) {
        this.form.get('idcuenta').disable();
        this.BuscarNombre(value, 'cuentac');
      } else if (value.length > 16) {
        alert('El numero ingresado no corresponde a una cuenta corriente');
      }
    } else if (this.tamano === 5) {
      if (value.length === 0) {
        this.form.patchValue({
          idcuenta: [''],
          nombre: ['']
        });
      } else if (value.length === this.tamano) {
        this.form.get('idcuenta').disable();
        this.BuscarNombre(value, 'servicio');
      } else if (value.length > 5) {
        alert('El numero ingresado no corresponde a un servicio');
      }
    } else if (this.tamano === 9) {
      if (value.length === 0) {
        this.form.patchValue({
          idcuenta: [''],
          nombre: ['']
        });
      } else if (value.length === this.tamano) {
        this.form.get('idcuenta').disable();
        this.BuscarNombre(value, 'telefono');
      } else if (value.length > 9) {
        alert('El numero ingresado no corresponde a un telefono');
      }
    }
  }

  private Definidor(value: string) {
    if (value === '1710' || value === '1700') {
      if (value === '1710') {
        this.titulo = 'DEPOSITO CUENTA DE AHORROS';
      } else {
        this.titulo = 'RETIRO CUENTA DE AHORROS';
      }
      setTimeout(() => {
        this.cuentaf.nativeElement.focus();
      }, 1000);
      this.tamano = 17;
      this.preciov = false;
      this.totalv = false;
    } else if (value === '0610' || value === '0600') {
      if (value === '0610') {
        this.titulo = 'DEPOSITO CUENTA DE CORRIENTE';
      } else {
        this.titulo = 'RETIRO CUENTA DE CORRIENTE';
      }
      setTimeout(() => {
        this.cuentaf.nativeElement.focus();
      }, 1000);
      this.tamano = 16;
      this.preciov = false;
      this.totalv = false;
    } else if (value === '0900' || value === '0901') {
      if (value === '0900') {
        this.titulo = 'PAGO DEL SERVICIO DE AGUA';
      } else {
        this.titulo = 'PAGO DEL SERVICIO DE ELECTRICIDAD';
      }
      setTimeout(() => {
        this.cuentaf.nativeElement.focus();
      }, 1000);
      this.tamano = 5;
      this.preciov = false;
      this.totalv = false;
    } else if (value === '0902' || value === '0903') {
      if (value === '0902') {
        this.titulo = 'PAGO DEL SERVICIO DE CLARO';
      } else {
        this.titulo = 'PAGO DEL SERVICIO DE MOVISTAR';
      }
      setTimeout(() => {
        this.cuentaf.nativeElement.focus();
      }, 1000);
      this.tamano = 9;
      this.preciov = false;
      this.totalv = false;
    } else if (value === '0813' || value === '0815') {
      if (value === '0813') {
        this.precio = 2;
        this.titulo = 'COMPRA DE MONEDA EXTRANJERA';
      } else {
        this.precio = 3;
        this.titulo = 'VENTA DE MONEDA EXTRANJERA';
      }
      setTimeout(() => {
        this.importef.nativeElement.focus();
      }, 1000);
      this.idcuentav = false;
      this.nombrev = false;
    } else if (value === '1910' || value === '1900') {
      if (value === '1910') {
        this.titulo = 'INGRESO DE EFECTIVO';
      } else {
        this.titulo = 'SALIDA DE EFECTIVO';
      }
      setTimeout(() => {
        this.importef.nativeElement.focus();
      }, 1000);
      this.preciov = false;
      this.idcuentav = false;
      this.nombrev = false;
    } else if (value === '0100') {
      this.router.navigate(['cuadre']);
    } else if (value === '0110') {
      this.router.navigate(['consolidado']);
    } else if (value === '1500') {
      this.router.navigate(['extorno']);
    } else {
      alert('Operaciones o transacciones no halladas');
      this.router.navigate(['inicio']);
    }
  }

  private BuscarNombre(cuenta: string, subaccion: string) {
    let formData;
    formData = new FormData();
    formData.append('accion', 'buscarn');
    formData.append('subaccion', subaccion);
    formData.append('cuenta', cuenta);
    this.conexion.servicio(formData).subscribe(
      nombrec => {
        Object.keys(nombrec).map((key) => {
          if (key === 'nombre') {
            this.form.patchValue({
              nombre: nombrec[key][0]['nombrec']
            });
            return this.importef.nativeElement.focus();
          } else {
            this.form.patchValue({
              nombre: ['USUARIO NO EXISTE'],
            });
            this.form.get('idcuenta').enable();
            return this.cuentaf.nativeElement.focus();
          }
        });
      }
    );
  }

  ComprobarDatos() {
    if (this.rutaActiva.snapshot.params.id === '1710' || this.rutaActiva.snapshot.params.id === '1700') {
      if (this.form.valid) {
        this.RealizarOp(this.val, '2');
      }
    } else if (this.rutaActiva.snapshot.params.id === '0610' || this.rutaActiva.snapshot.params.id === '0600') {
      if (this.form.valid) {
        this.RealizarOp(this.val, '2');
      }
    } else if (this.rutaActiva.snapshot.params.id === '0900' || this.rutaActiva.snapshot.params.id === '0901') {
      if (this.form.valid) {
        this.RealizarOp(this.val, '2');
      }
    } else if (this.rutaActiva.snapshot.params.id === '0902' || this.rutaActiva.snapshot.params.id === '0903') {
      if (this.form.valid) {
        this.RealizarOp(this.val, '2');
      }
    } else if (this.rutaActiva.snapshot.params.id === '0813' || this.rutaActiva.snapshot.params.id === '0815') {
      if (this.form.get('monto').value !== '') {
        this.RealizarOp(this.val, this.rutaActiva.snapshot.params.id);
      }
    } else if (this.rutaActiva.snapshot.params.id === '1910' || this.rutaActiva.snapshot.params.id === '1900') {
      if (this.form.get('monto').value !== '') {
        this.RealizarOp(this.val, '2');
      }
    }
  }

  TipoCambio(event: any) {
    const value = event.target.value;
    if (value.length !== 0) {
      setTimeout(() => {
        this.monedaf.nativeElement.focus();
      }, 1000);
      if (this.val === '1' && this.rutaActiva.snapshot.params.id === '0813') {
        this.total0 = this.precio * value;
        this.total = Math.round(this.total0 * Math.pow(10, 2)) / Math.pow(10, 2) + 'PEN';
      } else if (this.val === '1' && this.rutaActiva.snapshot.params.id === '0815') {
        this.total0 = this.precio * value;
        this.total = Math.round(this.total0 * Math.pow(10, 2)) / Math.pow(10, 2) + 'PEN';
      } else if (this.val === '2' && this.rutaActiva.snapshot.params.id === '0813') {
        this.total0 = value / this.precio;
        this.total = Math.round(this.total0 * Math.pow(10, 2)) / Math.pow(10, 2) + 'USD';
      } else if (this.val === '2' && this.rutaActiva.snapshot.params.id === '0815') {
        this.total0 = value / this.precio;
        this.total = Math.round(this.total0 * Math.pow(10, 2)) / Math.pow(10, 2) + 'USD';
      }
    } else {
      this.total0 = 0;
      this.total = Math.round(this.total0 * Math.pow(10, 2)) / Math.pow(10, 2) + '';
    }
  }

  Seleccionado(id: string) {
    const value = this.form.get('monto').value;
    this.val = id;
    if (value.length !== 0) {
      if (this.val === '1' && this.rutaActiva.snapshot.params.id === '0813') {
        this.total0 = this.precio * value;
        this.total = Math.round(this.total0 * Math.pow(10, 2)) / Math.pow(10, 2) + 'PEN';
      } else if (this.val === '1' && this.rutaActiva.snapshot.params.id === '0815') {
        this.total0 = this.precio * value;
        this.total = Math.round(this.total0 * Math.pow(10, 2)) / Math.pow(10, 2) + 'PEN';
      } else if (this.val === '2' && this.rutaActiva.snapshot.params.id === '0813') {
        this.total0 = value / this.precio;
        this.total = Math.round(this.total0 * Math.pow(10, 2)) / Math.pow(10, 2) + 'USD';
      } else if (this.val === '2' && this.rutaActiva.snapshot.params.id === '0815') {
        this.total0 = value / this.precio;
        this.total = Math.round(this.total0 * Math.pow(10, 2)) / Math.pow(10, 2) + 'USD';
      }
    } else {
      this.total0 = 0;
      this.total = Math.round(this.total0 * Math.pow(10, 2)) / Math.pow(10, 2) + '';
    }
  }
}
