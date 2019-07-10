import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import {UsuarioService} from '../../Servicios/usuario.service';
import {ConexionService} from '../../Servicios/conexion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _success = new Subject<string>();
  form: FormGroup;
  private formSubmitAttempt: boolean;
  mensaje: string;
  constructor(private fb: FormBuilder,
              private servicio: ConexionService,
              private usuarioservicio: UsuarioService) { }

  ngOnInit() {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
    this._success.subscribe((message) => this.mensaje = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.mensaje = null);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }
  LoginUser() {
    if (this.form.valid) {
      let formData;
      formData = new FormData();
      formData.append('accion', 'login');
      formData.append('usuario', this.form.get('usuario').value);
      formData.append('password', this.form.get('password').value);

      this.servicio.servicio(formData).subscribe(
        usuario => {
          Object.keys(usuario).map((key) => {
            if (key === 'usu') {
              this.usuarioservicio.setUsuarioLogeadoen(usuario[key]);
              location.reload();
            } else {
              if (key === 'mensaje') {
                this._success.next(usuario[key]);
              }
            }
          });
        }
      );
    }
    this.formSubmitAttempt = true;
  }
}
