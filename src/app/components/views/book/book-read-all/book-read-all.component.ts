import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-read-all',
  templateUrl: './book-read-all.component.html',
  styleUrls: ['./book-read-all.component.css']
})
export class BookReadAllComponent implements OnInit {

  id_cat: String = ''

  books: Book[] = [];

  displayedColumns: string[] = ['id', 'title', 'books', 'actions'];

  constructor(
    private service: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.findAll();
  }

  findAll(): void {
    this.service.findAllByCategory(this.id_cat).subscribe(resposta => {
      this.books = resposta;
    })
  }

  BrowseToCreateBook(): void {
    this.router.navigate([`categories/${this.id_cat}/books/create`])
  }

}
