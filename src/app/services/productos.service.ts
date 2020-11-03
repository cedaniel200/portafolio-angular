import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../intefaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  cargando = true;

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(): void {
    this.http.get('https://angular-html-cedaniel200.firebaseio.com/productos_idx.json')
    .subscribe((resp: Producto[]) => {
      this.productos = resp;
      this.cargando = false;
    });

  }
}
