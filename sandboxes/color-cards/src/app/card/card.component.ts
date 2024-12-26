import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../app.component';

@Component({
  selector: 'app-card',
  standalone: false,

  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() card!: Card;
  @Output() onBtnClick = new EventEmitter<Card>();

  onClick() {
    this.onBtnClick.emit(this.card);
  }
}
