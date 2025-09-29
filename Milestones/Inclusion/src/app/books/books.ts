import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BooksService } from '../service/book.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})
export class BooksComponent implements OnInit {
  translations: any[] = [];
  booksMap: { [id: number]: string } = {};
  verses: any[] = [];
  selectedTranslation: string = '';

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    // Load translations
    this.booksService.getTranslations().subscribe({
      next: data => {
        this.translations = data;
        // Set default translation
        const defaultTranslation = this.translations.find(t => t.translation === 'KJV');
        if (defaultTranslation) {
          this.selectedTranslation = defaultTranslation.translation;
        }
        this.loadBooks();
      },
      error: err => console.error('Failed to load translations', err)
    });
  }

  loadBooks(): void {
    this.booksService.getBooks().subscribe({
      next: data => {
        data.forEach(b => this.booksMap[b.id] = b.name); // map book ids
        this.loadVerses();
      },
      error: err => console.error('Failed to load books', err)
    });
  }

  onTranslationChange(): void {
    this.loadVerses();
  }

  loadVerses(): void {
    if (!this.selectedTranslation) {
      this.verses = [];
      return;
    }

    this.booksService.getVersesByTranslation(this.selectedTranslation).subscribe({
      next: data => {
        console.log('Received verses:', data); // debug
        this.verses = data;
      },
      error: err => console.error('Failed to load verses', err)
    });
  }
}
