import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  version: string = '1.0';
  protected readonly title = signal('My Music Collection');

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  displayVersion() {
    alert('Version: ' + this.version);
  }
  displayArtistList () {
    this.router.navigate(['list-artists'], { queryParams: { data: new Date()} })
  }
}
