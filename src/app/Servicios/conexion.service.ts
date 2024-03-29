import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private url = 'https://prebanker.com/api/V1/';

  constructor(protected http: HttpClient) {
  }

  servicio(object: Object) {
    return this.http.post(this.url, object).pipe(
      map(res => res));
  }
}
