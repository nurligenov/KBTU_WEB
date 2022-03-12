import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  products: Product[];
  
  constructor(private route: ActivatedRoute, private productService: ProductsService, private router: Router) { 
    this.products = this.productService.products;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
       const id = params['id'];
       this.products = this.products.filter(product => product.id==id);
     });
   }

   remove(id: number){
    const category_id = this.products[0].category_id;
    this.productService.remove(id);
    this.router.navigateByUrl('/');
    setTimeout(() => window.alert('Product succesfully removed'), 1000);
   }
}
