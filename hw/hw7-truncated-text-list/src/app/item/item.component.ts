import { Component, Input } from '@angular/core';
import { Item } from '../app.interfaces';

@Component({
  selector: 'app-item',
  standalone: false,

  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input() item: Item | null = null;
}
