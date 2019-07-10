import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Transacciones} from '../../Modelos/Transacciones';
import {UsuarioService} from '../../Servicios/usuario.service';
import {ConexionService} from '../../Servicios/conexion.service';

@Component({
  selector: 'app-consolidado-transaccion',
  templateUrl: './consolidado-transaccion.component.html',
  styleUrls: ['./consolidado-transaccion.component.css']
})
export class ConsolidadoTransaccionComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Transacciones>();
  columnas = ['id', 'transaccion', 'moneda', 'monto', 'cuenta', 'fecha'];
  entradasd = 0;
  entradass = 0;
  salidasd = 0;
  salidass = 0;
  totals: string;
  totald: string;
  entradassd = 0;
  salidassd = 0;
  entradasds = 0;
  salidasds = 0;
  totalds = 0;
  totalsd = 0;

  constructor(private usuario: UsuarioService,
              private conexion: ConexionService) {
  }

  ngOnInit() {
    this.Llenartransacciones();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginacion;
  }

  private Llenartransacciones() {
    const cajero = this.usuario.getUsuarioLogeadoen();
    const formData = new FormData;
    formData.append('accion', 'realizados');
    formData.append('cajero', cajero[0]['id']);
    this.conexion.servicio(formData).subscribe(
      transacciones => {
        Object.keys(transacciones).map((key) => {
          if (key === 'transacciones') {
            this.dataSource.data = transacciones[key] as Transacciones[];
            this.LlenarTotalD();
          }
        });
      }
    );
  }

  private LlenarTotalD() {
    for (const row of this.dataSource.data) {
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
        const totald0 = (this.entradasd - this.salidasd) - this.totalsd;
        const totals0 = (this.entradass - this.salidass) - this.totalds;
        this.totald = Math.round(totald0 * Math.pow(10, 2)) / Math.pow(10, 2) + 'USD';
        this.totals = Math.round(totals0 * Math.pow(10, 2)) / Math.pow(10, 2) + 'PEN';
      }
    }
  }
}
