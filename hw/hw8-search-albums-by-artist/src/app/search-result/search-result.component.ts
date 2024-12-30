import { Component, Input } from '@angular/core';
import { albums } from './dummy';

interface Album {
  thumbnail: string;
  collectionName: string;
  artistName: string;
}

@Component({
  selector: 'app-search-result',
  standalone: false,

  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent {
  @Input() query: string = 'bruno mars';
  result: Album[] = albums;
}
