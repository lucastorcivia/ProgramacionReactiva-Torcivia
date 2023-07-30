import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Product } from './productos.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products$ = new BehaviorSubject<Product[]>([]);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  loadProducts(): void {
    this.products$.next([
      {
        id: 1,
        name: 'Televisor',
        price: 50000,
        stock: 50,
      },
      {
        id: 2,
        name: 'Celular',
        price: 30000,
        stock: 25,
      },
      {
        id: 3,
        name: 'Computadora',
        price: 80000,
        stock: 15,
      },
      {
        id: 4,
        name: 'Monitor',
        price: 20000,
        stock: 5,
      }
    ]);
  }

  create(): void {
    this.products$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.products$.next([
          ...arrayActual,
          {
            id: arrayActual.length + 1,
            name: 'Producto N°'+ (arrayActual.length + 1),
            price: Math.floor(Math.random() * (50000 - 10000 + 1) + 10000),
            stock: Math.floor(Math.random() * (100 - 10 + 1) + 10),
          },
        ]);
      },
    });
  }

  deleteById(id: number): void {
    this.products$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.products$.next(
          arrayActual.filter((p) => p.id !== id),
        );
      }
    })
  }
}
