import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '../models/albums.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-display-album',
  imports: [RouterLink, CommonModule],
  templateUrl: './display-album.html',
  styleUrl: './display-album.css'
})
export class DisplayAlbum {
  @Input() album!: Album;
  tracksVisible = false;

  toggleTracks() {
    this.tracksVisible = !this.tracksVisible;
  }
}
