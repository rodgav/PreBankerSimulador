import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UsuarioService} from '../../Servicios/usuario.service';
import {Router} from '@angular/router';
import {Tipos} from '../../Modelos/Tipos';
import {ConexionService} from '../../Servicios/conexion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  form: FormGroup;
  logeado: boolean;
  operaciones: Tipos[];
  transacciones: Tipos[];
  private val;
  @ViewChild('codigo') codigof: ElementRef;

  constructor(private fb: FormBuilder,
              private usuarioservicio: UsuarioService,
              private router: Router,
              private conexion: ConexionService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      idoperaciones: [''],
      idtransacciones: [''],
      idtransaccion: ['']
    });
    setTimeout(() => {
      this.codigof.nativeElement.focus();
    }, 1000);
    this.val = this.usuarioservicio.getUsuarioLogeadoen();
    // console.log(this.usuarioservicio.getUsuarioLogeadoen()[0]['id']);
    if (this.val != null && this.val !== '') {
      this.logeado = true;
      this.router.navigate(['inicio']);
    } else {
      this.router.navigate(['login']);
    }
    this.LlenarOperaciones();
  }

  Operaciones() {
    this.form.patchValue({
      idtransaccion: ['']
    });
    this.LlenarTransacciones(this.form.get('idoperaciones').value);
  }

  Transacciones() {
    this.router.navigate(['/operacion', this.form.get('idtransacciones').value]);
    this.form.patchValue({
      idoperaciones: [''],
      idtransacciones: ['']
    });
  }

  private LlenarOperaciones() {
    let formData;
    formData = new FormData();
    formData.append('accion', 'opes');
    this.conexion.servicio(formData).subscribe(
      opes => {
        Object.keys(opes).map((key) => {
          if (key === 'opes') {
            this.operaciones = opes[key];
          }
        });
      }
    );
  }

  private LlenarTransacciones(value: string) {
    let formData;
    formData = new FormData();
    formData.append('accion', 'trans');
    formData.append('id', value);
    this.conexion.servicio(formData).subscribe(
      trans => {
        Object.keys(trans).map((key) => {
          if (key === 'trans') {
            this.transacciones = trans[key];
          }
        });
      }
    );
  }

  CerraSesion() {
    let formData;
    formData = new FormData();
    formData.append('accion', 'eliminartrans');
    formData.append('cajero', this.val[0]['id']);
    this.conexion.servicio(formData).subscribe(
      mensaje => {
        Object.keys(mensaje).map((key) => {
          if (key === 'mensaje') {
            if (mensaje[key] === 'Transacciones eliminadas correctamente' || mensaje[key] === 'No se encontraron transacciones') {
              this.usuarioservicio.logout();
              this.router.navigate(['login']);
              this.logeado = false;
            }
          }
        });
      }
    );
  }

  Controlar(event: any) {
    const value = event.target.value;
    this.form.patchValue({
      idoperaciones: [''],
      idtransacciones: ['']
    });
    if (value.length === 4) {
      this.router.navigate(['/operacion', value]);
      this.form.patchValue({
        idtransaccion: ['']
      });
    }
  }
}
