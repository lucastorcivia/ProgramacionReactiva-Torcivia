import { Component, OnInit } from '@angular/core';
import { Product } from './productos.interface';
import { ProductService } from './product.service';
import { Observable} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public data$: Observable<Product[]>;

  public displayedColumns = ['id', 'name', 'price', 'stock' ,'actions'];

  constructor(private productService: ProductService) {
    this.data$ = this.productService.getProducts();
  }


  ngOnInit(): void {
    this.productService.loadProducts();
  }

  onCreate(): void {
    this.productService.create();
  }

  onDelete(id: number): void {
    this.productService.deleteById(id);
  }
}


