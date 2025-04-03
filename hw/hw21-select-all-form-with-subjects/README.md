# Hw21SelectAllFormWithSubjects

## Requirements

1. Using Template-driven OR Reactive form to build an app in Angular. There are a select all checkbox, movie checkboxes and a "clear all"  button. Also, you can have a selected items section.
2. If all the movies are checked, the select all checkboxes will be automatically be checked.
3. If any of the movie is unchecked, the select all is unchecked.
4. If selectall checkbox is changed from check to uncheck, all the movie checkboxes are unchecked.
5. Click "Clear all" button, all the checkboxes are unchecked.
6. (Optional) If one movie is checked, the name of the movie will be shown in the view (in selected values). If the movie is unchecked, the name will be disappeared.

```typeScript
 itemList = [
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
```

## Is including `selectAll` as a control in `movieForm` a bad idea? Should I separate from the form? Will it cause infinite changes since they are changed by each other?

Including selectAll in the same form group as movies isn't necessarily a bad idea, but it does require careful handling to prevent infinite loops when they update each other.

## `this.movieForm.controls.selectAll` vs `this.movieForm.get('selectAll')`

For your case with typed forms, using this.movieForm.controls.selectAll is indeed preferable because:

1. It leverages Angular's typed reactive forms feature
1. It provides better type safety without manual assertions
1. It's more concise and readable
1. You get better IDE support and autocompletion
