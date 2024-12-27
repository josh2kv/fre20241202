import { Component, Input } from '@angular/core';
import { Card } from './card.interfaces';

@Component({
  selector: 'app-card',
  standalone: false,

  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() card!: Card;
}
