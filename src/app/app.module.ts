import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './Componentes/login/login.component';
import {HeaderComponent} from './Componentes/header/header.component';
import {TransaccionesComponent} from './Componentes/transacciones/transacciones.component';
import {CuadreCajaComponent} from './Componentes/cuadre-caja/cuadre-caja.component';
import {ConsolidadoTransaccionComponent} from './Componentes/consolidado-transaccion/consolidado-transaccion.component';
import {RouterModule} from '@angular/router';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule, MatPaginatorModule,
  MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FooterComponent} from './Componentes/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {MensajeComponent} from './Componentes/ComponentsDialogs/mensaje/mensaje.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {InicioComponent} from './Componentes/inicio/inicio.component';
import {ExtornoComponent} from './Componentes/extorno/extorno.component';
import {ConfirmarComponent} from './Componentes/ComponentsDialogs/confirmar/confirmar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    TransaccionesComponent,
    CuadreCajaComponent,
    ConsolidadoTransaccionComponent,
    FooterComponent,
    MensajeComponent,
    InicioComponent,
    ExtornoComponent,
    ConfirmarComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatToolbarModule,
    MatAutocompleteModule,
    RouterModule.forRoot(
      [
        {path: 'operacion/:id', component: TransaccionesComponent},
        {path: 'inicio', component: InicioComponent},
        {path: 'consolidado', component: ConsolidadoTransaccionComponent},
        {path: 'cuadre', component: CuadreCajaComponent},
        {path: 'login', component: LoginComponent},
        {path: 'extorno', component: ExtornoComponent}
      ]
    )
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmarComponent, MensajeComponent]
})
export class AppModule {
}
