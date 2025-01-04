# Hw11: Select All Form

1. Using Template-driven OR Reactive form to build an app in Angular. There are a select all checkbox, movie checkboxes and a "clear all"  button. Also, you can have a selected items section.
2. If all the movies are checked, the select all checkboxes will be automatically be checked.
3. If any of the movie is unchecked, the select all is unchecked.
4. If selectall checkbox is changed from check to uncheck, all the movie checkboxes are unchecked.
5. Click "Clear all" button, all the checkboxes are unchecked.
6. (Optional) If one movie is checked, the name of the movie will be shown in the view (in selected values). If the movie is unchecked, the name will be disappeared.

## Updating field values manually: `FormGroup.patchValue` vs `FormGroup.setValue`

- `setValue()`
  - Requires you to provide values for ALL form controls in the form group
  - Throws an error if you miss any control or provide extra properties
  - Stricter and safer when you want to ensure all form fields are updated
- `patchValue()`
  - Allows partial updates to the form
  - Only updates the form controls that match the provided object properties
  - More flexible as you can update just a subset of form controls

## Handling an array field: `onChange` vs `FormArray`

- The `FormArray` approach is generally recommended as it's:

  - More idiomatic Angular
  - Less error-prone
  - Better integrated with the forms system
  - More maintainable
- However, the manual approach might be better if you need more control over the exact behavior or data structure.

| Aspect |  onChange(Manual) | FormArray (Automatic) |
|--------|------------------|---------------------|
| Code Complexity | Higher - Manual event handling and array updates | Lower - Angular handles bindings |
| Type Safety | Direct - Works with final string[] | Indirect - Needs boolean[] to string[] conversion |
| Performance | Lower - Manual array operations | Higher - Angular optimized updates |
| Memory Usage | Lower - Single array of strings | Higher - Array of FormControl objects |
| Debugging | Easier - Direct access to values | Harder - Needs value conversion |
| Flexibility | Higher - Custom behavior possible | Lower - Standard Angular behavior |
| Angular Integration | Lower - Manual integration | Higher - Native form integration |
| Maintainability | Lower - More custom code | Higher - Standard Angular patterns |
| Best For | - Custom behavior needs<br>- Direct value access<br>- Complex validation | - Standard form behavior<br>- Simple implementation<br>- Angular integration |
| Drawbacks | - More code to maintain<br>- Manual error handling<br>- Performance impact | - More memory usage<br>- Indirect value access<br>- Less flexible |
