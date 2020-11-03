import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../intefaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  cargando = true;

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {

    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-html-cedaniel200.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getDetalleProducto(id: string) {
    return this.http.get(`https://angular-html-cedaniel200.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string): void {
    if (this.productos.length === 0){
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      });
    }else{
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string): void {
    termino = termino.toLocaleLowerCase();
    this.productosFiltrados = [];
    this.productosFiltrados = this.productos
    .filter( producto => {
      const titulo = producto.titulo.toLocaleLowerCase();
      const categoria = producto.categoria.toLocaleLowerCase();
      return categoria.indexOf(termino) >= 0 ||
        titulo.indexOf(termino) >= 0;
    } );
  }
}
