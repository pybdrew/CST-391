import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  constructor(private route: ActivatedRoute, private service: MusicServiceService) {}
  selectedArtist: Artist | null = null;
  artists: Artist[] = [];

  ngOnInit()
  {
    this.route.queryParams.subscribe(params => 
    {
      console.log("Getting data....");
      this.artists = this.service.getArtists();
      this.selectedArtist = null;
    });
  }

  onSelectedArtist(artist: Artist) {
    this.selectedArtist = artist;
  }
}
