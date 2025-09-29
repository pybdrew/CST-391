import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/books`);
  }

  getTranslations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/translations`);
  }

  // Call the updated backend route /verses/all
  getVersesByTranslation(translation: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/verses/all?translation=${translation}`);
  }

  getVerses(bookId: number, translation: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/verses?bookId=${bookId}&translation=${translation}&chapter=1`);
  }

  getVerseById(verseId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/verses/${verseId}`);
  }
}
