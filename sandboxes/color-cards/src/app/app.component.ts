import { Component } from '@angular/core';
import { cards } from '../data/dummy';

export interface Card {
  userId: number;
  id: number;
  title: string;
  body: string;
  btnColor: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'This is a dynamic color cards app';
  subTitle: string = 'Click on the button to change the color.';
  themeColor: string = 'cyan';
  cards: Card[] = cards;

  onCardBtnClick(card: Card) {
    this.themeColor = card.btnColor;
  }
}
