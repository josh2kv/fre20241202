import { Component } from '@angular/core';
import { Card } from './card/card.interfaces';

@Component({
  selector: 'app-card-list',
  standalone: false,

  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent {
  cards: Card[] = [
    {
      id: 1,
      title: 'Blue Card',
      content:
        'The sky stretches endlessly above us, a canvas of deep azure that captures the imagination. On clear days, it seems to hold infinite possibilities, reminding us of the vastness of our universe and the beauty of natural phenomena that surround us daily.',
      color: 'blue',
    },
    {
      id: 2,
      title: 'Black Card',
      content:
        'In the depths of night, stars twinkle like diamonds scattered across black velvet. The darkness holds mysteries and secrets, yet it also brings peace and tranquility, allowing us to rest and reset for another day of adventures ahead.',
      color: 'black',
    },
    {
      id: 3,
      title: 'Red Card',
      content:
        'Passion burns like a flame, intense and unwavering. From the warmth of a sunset to the fierce energy of a blazing fire, red represents the power of emotion and the strength of determination that drives us forward in pursuit of our dreams.',
      color: 'red',
    },
    {
      id: 4,
      title: 'Green Card',
      content:
        'Nature flourishes in countless shades of green, from the tender shoots of spring to the deep emerald of ancient forests. This color of life and growth reminds us of our connection to the earth and the constant renewal of the natural world around us.',
      color: 'green',
    },
  ];
}
