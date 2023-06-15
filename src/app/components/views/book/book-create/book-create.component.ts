import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  title = new FormControl("",  [Validators.minLength(3)]);
  author = new FormControl("",  [Validators.minLength(3)]);
  text = new FormControl("",  [Validators.minLength(10)]);

  id_cat: String = ''

  book: Book = {
    id: "",
    title: "",
    author: "",
    text: "",
  }


  constructor(
    private service: BookService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
  }

  create(): void {
    this.service.create(this.book, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message('Book created successfully!');
    }, err => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message('Error creating new book! Try later');
    })
  }

  cancel(): void {
    this.router.navigate([`categories/${this.id_cat}/books`]);
  }

  getMessage() {
    if (this.title.invalid) {
      return "The title field must contain between 3 and 100 characters";
    }
    if (this.author.invalid) {
      return "The title field must contain between 3 and 100 characters";
    }
    if (this.text.invalid) {
      return "The title field must contain between 10 and 100 characters";
    }
    return false;
  }
}
