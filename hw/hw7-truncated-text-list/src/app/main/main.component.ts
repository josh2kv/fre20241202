import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../app.interfaces';

@Component({
  selector: 'app-main',
  standalone: false,

  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  @Input() items!: Item[];
  @Input() selectedItemId!: number | null;

  @Output() onSelect = new EventEmitter<number>();

  onClickItem(id: number) {
    this.selectedItemId = id;
    this.onSelect.emit(id);
  }
}
