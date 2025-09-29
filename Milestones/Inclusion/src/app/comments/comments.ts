import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../service/comments.service';
import { BooksService } from '../service/book.service';
import { RouterModule, Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './comments.html',
  styleUrls: ['./comments.css']
})
export class CommentsComponent implements OnInit {
  comments: any[] = [];
  filteredComments: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  booksMap: { [id: number]: string } = {};
  translations: string[] = [];
  selectedTranslation: string = 'All';

  constructor(
    private commentsService: CommentsService,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe({
      next: books => {
        books.forEach(b => (this.booksMap[b.id] = b.name));
        this.loadComments();
      },
      error: err => {
        console.error('Failed to load books', err);
        this.errorMessage = 'Failed to load books';
        this.loading = false;
      }
    });
  }

  loadComments(): void {
    this.commentsService.getAllComments().subscribe({
      next: data => {
        const commentObservables = data.map(c =>
          this.booksService.getVerseById(c.verse_id).pipe(
            map(verse => ({
              id: c.id,
              ...c,
              bookName: this.booksMap[verse.book_id] || 'Book ' + verse.book_id,
              chapter: verse.chapter,
              verseNumber: verse.verseNumber
            }))
          )
        );

        forkJoin(commentObservables).subscribe({
          next: commentsWithVerse => {
            this.comments = commentsWithVerse;

            // Build list of unique translations
            const translationSet = new Set(this.comments.map(c => c.translation));
            this.translations = ['All', ...Array.from(translationSet)];

            this.applyFilter();
            this.loading = false;
          },
          error: err => {
            console.error('Failed to load verse info for comments', err);
            this.errorMessage = 'Failed to load comments';
            this.loading = false;
          }
        });
      },
      error: err => {
        console.error('Failed to load comments', err);
        this.errorMessage = 'Failed to load comments';
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    if (this.selectedTranslation === 'All') {
      this.filteredComments = this.comments;
    } else {
      this.filteredComments = this.comments.filter(c => c.translation === this.selectedTranslation);
    }
  }

  deleteComment(commentId: number): void {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    this.commentsService.deleteComment(commentId).subscribe({
      next: () => {
        // Remove comment from both arrays
        this.comments = this.comments.filter(c => c.id !== commentId);
        this.applyFilter();

        // Simple confirmation alert
        alert('Comment deleted successfully!');
      },
      error: err => {
        console.error('Failed to delete comment', err);
        alert('Failed to delete comment');
      }
    });
  }

  editComment(commentId: number): void {
    // Navigate to the EditCommentComponent with the comment ID
    this.router.navigate(['/edit-comment', commentId]);
  }
}
