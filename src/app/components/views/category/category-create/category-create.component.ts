import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category: Category = {
    name: "",
    description: "",
  }

  constructor(
    private service: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.category).subscribe((resposta) => {
      this.router.navigate(['categories'])
      this.service.message('Category created successfully!');
    }, err => {
      for (const element of err.error.errors) {
        this.service.message(element.message)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['categories'])
  }
}
