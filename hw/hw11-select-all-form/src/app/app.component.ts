import { Component } from '@angular/core';
import { SelectAllFormValues } from './select-all-form/select-all-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hw11-select-all-form';
  checkboxItems = [
    'Changjinhu (2021)',
    'Dune (2021)',
    'Shang-Chi and the Legend of the Ten Rings (2021)',
    'Free Guy (2021)',
    'The Many Saints of Newark (2021)',
    'Finch (2021)',
    'Candyman (2021)',
    'No Time to Die (2021)',
    'Halloween Kills (2021)',
  ];
  initialFormValues: SelectAllFormValues = {
    items: this.checkboxItems.map((_) => false),
  };
  submittedFormValues: SelectAllFormValues | null = null;

  onFormSubmitted(formValues: SelectAllFormValues) {
    this.submittedFormValues = formValues;
  }

  get selectedItems() {
    return this.checkboxItems.filter(
      (_, index) => this.submittedFormValues?.items[index]
    );
  }
}
