import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosDetalle } from 'src/app/intefaces/producto-detalle.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductosDetalle;
  id: string;

  constructor(private route: ActivatedRoute, public productosService: ProductosService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe( parametros => { 
      this.productosService.getDetalleProducto(parametros['id'])
      .subscribe((producto: ProductosDetalle) => {
        this.id = parametros['id'];
        this.producto = producto;
      });
    });
  }

}
