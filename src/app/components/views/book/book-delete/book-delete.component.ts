import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {

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

  delete(): void {
    this.service.delete(this.book.id!).subscribe(() => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message('Book deleted successfully!')
    }, err => {
      this.router.navigate([`categories/${this.id_cat}/books`]);
      this.service.message('Failed to delete book! Try again later ..')
    })
  }

  cancel(): void {
    this.router.navigate([`categories/${this.id_cat}/books`]);
  }

}
