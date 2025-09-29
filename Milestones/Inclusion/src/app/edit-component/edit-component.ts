import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommentsService } from '../service/comments.service';
import { BooksService } from '../service/book.service';

@Component({
  selector: 'app-edit-comment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-component.html',
  styleUrls: ['./edit-component.css']
})
export class EditComment implements OnInit {
  commentId!: number;
  commentText = '';
  translation = '';
  loading = true;
  errorMessage = '';

  bookName = '';
  chapter!: number;
  verseNumber!: number;

  booksMap: { [id: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentsService: CommentsService,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.commentId = Number(this.route.snapshot.paramMap.get('commentId'));

    // Load all books for mapping
    this.booksService.getBooks().subscribe({
      next: books => {
        books.forEach(b => (this.booksMap[b.id] = b.name));
        this.loadComment();
      },
      error: () => {
        this.errorMessage = 'Failed to load books';
        this.loading = false;
      }
    });
  }

  loadComment(): void {
    this.commentsService.getAllComments().subscribe({
      next: data => {
        const comment = data.find(c => c.id === this.commentId);
        if (!comment) {
          this.errorMessage = 'Comment not found';
          this.loading = false;
          return;
        }

        this.commentText = comment.comment_text;
        this.translation = comment.translation;

        // Load verse info
        this.booksService.getVerseById(comment.verse_id).subscribe({
          next: verse => {
            this.bookName = this.booksMap[verse.book_id] || `Book ${verse.book_id}`;
            this.chapter = verse.chapter;
            this.verseNumber = verse.verseNumber;
            this.loading = false;
          },
          error: () => {
            this.errorMessage = 'Failed to load verse';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load comment';
        this.loading = false;
      }
    });
  }

  submitEdit(): void {
    if (!this.commentText.trim()) return;

    this.commentsService.updateComment(this.commentId, this.commentText, this.translation)
      .subscribe({
        next: () => {
          alert('Comment updated successfully!');
          this.router.navigate(['/comments']);
        },
        error: () => {
          alert('Failed to update comment');
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/comments']);
  }
}
