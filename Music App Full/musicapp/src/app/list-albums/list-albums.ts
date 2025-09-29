import { Component, Input } from '@angular/core';  // <-- import Input here
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MusicServiceService } from '../../service/music-service.service';
import { Album } from '../models/albums.model';
import { DisplayAlbum } from "../display-album/display-album";

@Component({
  selector: 'app-list-albums',
  imports: [DisplayAlbum, CommonModule],
  templateUrl: './list-albums.html',
  styleUrl: './list-albums.css'
})
export class ListAlbums {
  @Input() artist?: string;

  albums: Album[] = [];
  selectedAlbum: Album | null = null;

  constructor(
    private service: MusicServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.artist) {
      // If artist is passed as input, fetch albums directly
      console.log('Getting albums for artist (via @Input):', this.artist);
      this.service.getAlbumsOfArtist(this.artist, (albums: Album[]) => {
        this.albums = albums;
        console.log('Albums loaded:', albums);
      });
    } else {
      // Otherwise, fallback to reading from route params (for direct URL access)
      this.route.params.subscribe(params => {
        const artistName = params['artist'];
        if (artistName) {
          console.log('Getting albums for artist (via route param):', artistName);
          this.service.getAlbumsOfArtist(artistName, (albums: Album[]) => {
            this.albums = albums;
            console.log('Albums loaded:', albums);
          });
        } else {
          console.warn('No artist name found in params.');
        }
      });
    }
  }

  public onSelectAlbum(album: Album) {
    this.selectedAlbum = album;
  }
}
