import { Injectable } from '@angular/core';
import { Product, products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products: Product[] = products;

  like(id: number){
    this.products = this.products.map(product => {
      if(product.id === id) {
          product.likes += 1;
      }
      return product
   })
   this.updateStorage()
  }

  remove(id: number){
    this.products = this.products.filter(product => product.id != id);
    this.updateStorage()
  }

  updateStorage(){
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  constructor() {
    if (!localStorage.getItem('products')){
      localStorage.setItem('products', JSON.stringify(products));
    } else {
      this.products = JSON.parse(localStorage.getItem('products') || '');
    }
   }
}
