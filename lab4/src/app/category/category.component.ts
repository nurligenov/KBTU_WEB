import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categories } from '../categories';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories = categories;
  constructor(private router: Router) { }

  show(id: number) {
    this.router.navigateByUrl(`category/${id}/products`);
  }

}
