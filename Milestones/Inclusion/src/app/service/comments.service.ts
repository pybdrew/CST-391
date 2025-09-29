import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseUrl = 'http://localhost:8080/comments';

  constructor(private http: HttpClient) {}

  // Add translation as a parameter
  addComment(verseId: number, text: string, translation: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { verseId, commentText: text, translation });
  }

  getCommentsByVerse(verseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?verseId=${verseId}`);
  }

  // Fetch all comments
  getAllComments(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteComment(commentId: number) {
    return this.http.delete(`${this.baseUrl}/${commentId}`);
  }

  // Update existing comment
  updateComment(commentId: number, commentText: string, translation: string) {
  return this.http.put(`${this.baseUrl}/${commentId}`, {
    commentText,
    translation
  });
  }
}
