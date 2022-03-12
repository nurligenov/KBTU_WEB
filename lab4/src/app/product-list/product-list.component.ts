import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[];
  
  constructor(private route: ActivatedRoute, private productService: ProductsService, private router: Router) { 
    this.products = this.productService.products;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
       const category_id = params['category_id'];
       this.products = this.products.filter(product => product.category_id==category_id);
     });
   }

  share(url: string){
    var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
    var URL = "https://telegram.me/share/url?url=" + url + "&text=share";
    var win = window.open(URL, "_blank", strWindowFeatures);
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
  like(id: number) {
    this.productService.like(id);
  }

  details(id: number) {
    this.router.navigateByUrl(`product/${id}/`);
  }
}
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/