import { Injectable } from '@angular/core';
import exampledata from '../data/sample-music-data.json';
import { Artist } from '../app/models/artists.model';
import { Album } from '../app/models/albums.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { DeleteAlbum } from '../app/delete-album/delete-album';

// automatically provide this service application-wide
@Injectable({ providedIn: 'root' })
export class MusicServiceService {

  private host = 'http://localhost:8080'; // ✅ Base API URL

  constructor(private http: HttpClient) {}
  
  /**
   * GET a list of unique artists from the backend
   * Assumes your backend has a route like /artists
   */
  public getArtists(callback: (artists: Artist[]) => void): void {
    this.http.get<Artist[]>(this.host + "/artists").
      subscribe((artists: Artist[]) => {
        callback(artists);
      });
  }
  
  /**
   * GET the complete list of albums
   */
  public getAlbums(callback: (albums: Album[]) => void): void {
    // Return the list of Albums

    this.http.get<Album[]>(this.host + "/albums").
    subscribe((albums: Album[]) => {
      callback(albums);
    });
  }

  public getAlbumsOfArtist(artistName: String, callback: (albums: Album[]) => void): void {
    let request = `${this.host}/albums/${encodeURIComponent(artistName as string)}`;
    console.log('Frontend requesting URL:', request);
    console.log('request', request);
    this.http.get<Album[]>(request).
    subscribe((albums: Album[]) => {
      console.log('have albums', albums);
      callback(albums);
    });
  }

  public createAlbum(album: Album, callback: () => void): void {
    // Add a new Album
    this.http.post<Album>(this.host + "/albums", album)
    .subscribe((data) => {
      callback();
    });
  }
  
  public updateAlbum(album: Album, callback: () => void): void {
    this.http.put<Album>(this.host + "/albums", album)
    .subscribe((data) => {
      callback();
    });
  }

  public deleteAlbum(id: number, callback: () => void): void {
    this.http.delete(this.host + "/albums/" + id)
    .subscribe((data) => {
      callback();
    });
  }
}
