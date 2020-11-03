import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../intefaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  equipo: any[] = [];
  cargada = false;

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(): void {
    this.http.get('assets/data/data-pagina.json')
    .subscribe((resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
    });
  }

  private cargarEquipo(): void {
    this.http.get('https://angular-html-cedaniel200.firebaseio.com/equipo.json')
    .subscribe((resp) => {
      const respAsArray = Object.keys(resp).map(key => (resp[key]));
      this.equipo = respAsArray;
    });
  }
}
