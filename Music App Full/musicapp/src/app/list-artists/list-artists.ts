import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MusicServiceService } from '../../service/music-service.service';
import { Artist } from '../models/artists.model';
import { ListAlbums } from "../list-albums/list-albums";

@Component({
  selector: 'app-list-artists',
  imports: [CommonModule, ListAlbums],
  templateUrl: './list-artists.html',
  styleUrl: './list-artists.css'
})
export class ListArtists {
  constructor(private route: ActivatedRoute, private service: MusicServiceService, private router: Router) {}
  selectedArtist: Artist | null = null;
  artists: Artist[] = [];

  ngOnInit()
  {
    console.log("Getting data...");
    this.service.getArtists((artists: Artist[]) => {
      this.artists = artists;
      console.log('this.artists', this.artists);
    });
  }

  onSelectedArtist(artist: Artist) {
    this.router.navigate(['list-albums', artist.artist]);
  }
}
