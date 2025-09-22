import { Injectable } from '@angular/core';
import exampledata from '../data/sample-music-data.json';
import { Artist } from '../app/models/artists.model';
import { Album } from '../app/models/albums.model';

// automatically provide this service application-wide
@Injectable({ providedIn: 'root' })
export class MusicServiceService {

  // array to hold all albums loaded from JSON data
  albums: Album[] = exampledata;

  /**
   * GET a list of unique artists from the albums
   * @returns Artist[] - array of Artist objects
   */
  public getArtists(): Artist[] {
    // array to store artist objects
    let artists: Artist[] = [];
    // set to ensure artist names are unique
    let artistSet = new Set<string>();

    // collect unique artist names from the albums list
    this.albums.forEach(a => artistSet.add(a.artist));

    // convert the set of artist names into Artist objects
    artistSet.forEach(a => artists.push({artist: a}))
    return artists;
  }

  /**
   * GET the complete list of albums
   * @returns Album[] - array of all Album objects
   */
  public getAlbums(): Album[] {
    // Return the list of Albums
    return this.albums;
  }

  /**
   * GET albums for a specific artist
   * @param artistName - name of the artist
   * @returns Album[] - albums that belong to the specified artist
   */
  public getAlbumsOfArtist(artistName: String): Album[] {

    let albums: Album[] = [];

    // filter albums by matching artist name
    this.albums.forEach(album => {
      if (album.artist == artistName) {
        albums.push(album);
      }
    });
    return albums;
  }

  /**
   *  [POST] - Create a new album and add it to the albums list
   * @param album - the Album object to be added
   * @returns number - status code (1 for success)
   */
  public createAlbum(album: Album): number {
    // Add a new Album to the list of Albums
    this.albums.push(album);
    return 1;
  }

  /**
   * Update an existing album in the albums list
   * @param album - the Album object with updated data
   * @returns number - status code (0 for success, -1 if album not found)
   */
  public updateAlbum(album: Album): number {
    // Search for the Album in the list of Albums and replace it in the list
    for (let i = 0; i < this.albums.length; ++i) {
      if (this.albums[i].albumId == album.albumId) {
        // replace old album with updated one
        this.albums.splice(i, 1, album);
        return 0;
      }
    }
    // album not found
    return -1;
  }

  /**
   * DELete an album by its ID
   * @param id - the albumId of the album to delete
   * @returns number - status code (0 for success, -1 if not found)
   */
  public deleteAlbum(id: number): number {
    // Search for the Album in the list of Albums and delete from the list
    for (let i = 0; i < this.albums.length; ++i) {
      if (this.albums[i].albumId == id) {
        this.albums.splice(i, 1);
        return 0;
      }
    }
    // album not found
    return -1;
  }
}
