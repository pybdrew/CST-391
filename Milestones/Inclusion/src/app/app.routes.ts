import { Routes } from '@angular/router';
import { Home } from './home/home';
import { BooksComponent } from './books/books';
import { AddCommentComponent } from './addcomment/addcomment';
import { CommentsComponent } from './comments/comments';
import { EditComment } from './edit-component/edit-component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'books', component: BooksComponent },
  { path: 'addcomment/:verseId', component: AddCommentComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'edit-comment/:commentId', component: EditComment },
];
