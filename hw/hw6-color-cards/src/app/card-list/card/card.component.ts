import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from './card.interfaces';

@Component({
  selector: 'app-card',
  standalone: false,

  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() card!: Card;
  @Input() themeColor!: string;
  @Output() onSetThemeColor = new EventEmitter<string>();

  onClick(color: string) {
    this.onSetThemeColor.emit(color);
  }
}
