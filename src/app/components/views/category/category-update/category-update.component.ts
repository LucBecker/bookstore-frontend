import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  category: Category = {
    name: "",
    description: "",
  }

  constructor(
    private service: CategoryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.category.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.category.id!).subscribe ((resposta) => {
      this.category = resposta;
    });
  }

  update(): void {
    this.service.update(this.category).subscribe ((resposta) => {
      this.router.navigate(['categories'])
      this.service.message('Category updated successfully!')
    }, err => {
      this.service.message('Validate that all fields are filled in correctly')
    });
  }

  cancel(): void {
    this.router.navigate(['categories'])
  }

}
