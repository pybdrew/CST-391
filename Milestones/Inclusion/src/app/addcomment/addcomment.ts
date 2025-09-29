import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BooksService } from '../service/book.service';
import { CommentsService } from '../service/comments.service';

@Component({
  selector: 'app-addcomment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './addcomment.html',
  styleUrls: ['./addcomment.css']
})
export class AddCommentComponent implements OnInit {
  verseId!: number;
  verse: any;
  commentText: string = '';
  savedComment: string | null = null; // store last saved comment
  translation: string = '';
  booksMap: { [id: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.verseId = Number(this.route.snapshot.paramMap.get('verseId'));

    // Load books and verse
    this.booksService.getBooks().subscribe({
      next: data => {
        data.forEach(b => (this.booksMap[b.id] = b.name));
        this.loadVerse();
      },
      error: err => console.error('Failed to load books', err)
    });
  }

  loadVerse(): void {
    this.booksService.getVerseById(this.verseId).subscribe({
      next: v => {
        this.verse = v;
        this.translation = v.translation;
      },
      error: err => console.error('Failed to load verse', err)
    });
  }

  submitComment(): void {
    if (!this.commentText.trim()) return;

    this.commentsService
      .addComment(this.verseId, this.commentText, this.translation)
      .subscribe({
        next: _ => {
          // Save locally for confirmation
          this.savedComment = this.commentText;
          this.commentText = ''; // clear form
        },
        error: err => console.error('Failed to add comment', err)
      });
  }

  cancel(): void {
    this.savedComment = null;
    this.commentText = '';
    this.router.navigate(['/books']);
  }
}
