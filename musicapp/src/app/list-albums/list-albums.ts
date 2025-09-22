import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicServiceService } from '../../service/music-service.service';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';
import { DisplayAlbum } from "../display-album/display-album";

@Component({
  selector: 'app-list-albums',
  imports: [DisplayAlbum, CommonModule],
  templateUrl: './list-albums.html',
  styleUrl: './list-albums.css'
})
export class ListAlbums {
  constructor(private service: MusicServiceService) {}
  @Input() artist!: Artist;
  albums: Album[] = [];
  selectedAlbum: Album | null = null

  ngOnInit(): void {
    this.albums = this.service.getAlbumsOfArtist(this.artist.artist);
  }

  public onSelectAlbum(album: Album) {
    this.selectedAlbum = album;
  }
}
