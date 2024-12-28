import { Component, Input } from '@angular/core';
import { Item } from '../app.interfaces';

@Component({
  selector: 'app-main',
  standalone: false,

  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  @Input() items!: Item[];
  @Input() selectedItem!: number | null;
}
