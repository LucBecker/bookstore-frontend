import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

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
    this.book.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.book.id!).subscribe((resposta) => {
      this.book = resposta;
    })
  }

  update(): void {
    this.service.update(this.book).subscribe((resposta) => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message('Successfully updated book!')
    }, err => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message('Failed to update book! Try again later ..')
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
