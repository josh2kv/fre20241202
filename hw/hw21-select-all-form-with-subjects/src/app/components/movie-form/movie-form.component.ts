import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface MovieFormControls {
  movies: FormArray<FormControl<boolean>>;
  selectAll: FormControl<boolean>;
}

@Component({
  selector: 'app-movie-form',
  standalone: false,
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss',
})
export class MovieFormComponent implements OnInit {
  movieItems = [
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
  movieForm: FormGroup<MovieFormControls>;
  checkedList$: Observable<boolean[]>;

  constructor(fb: FormBuilder) {
    this.movieForm = fb.group<MovieFormControls>({
      selectAll: fb.control(false, { nonNullable: true }),
      movies: fb.array(
        this.movieItems.map(() => fb.control(false, { nonNullable: true }))
      ),
    });

    this.checkedList$ = this.getMoviesControl().valueChanges.pipe(
      map((movies) => movies)
    );
  }

  ngOnInit(): void {
    this.getMoviesControl().valueChanges.subscribe((movies) => {
      const isAllChecked = movies.every((movie) => movie);
      if (isAllChecked) {
        this.getSelectAllControl().patchValue(true, { emitEvent: false });
      } else {
        this.getSelectAllControl().patchValue(false, { emitEvent: false });
      }
    });

    this.getSelectAllControl().valueChanges.subscribe((selectAll) => {
      if (selectAll) {
        this.getMoviesControl().patchValue(
          this.movieItems.map(() => true),
          { emitEvent: false }
        );
      } else {
        this.getMoviesControl().patchValue(
          this.movieItems.map(() => false),
          { emitEvent: false }
        );
      }
    });
  }

  getSelectAllControl() {
    return this.movieForm.controls.selectAll;
  }

  getMoviesControl() {
    return this.movieForm.controls.movies;
  }

  clearMovies() {
    this.getMoviesControl().patchValue(
      this.movieItems.map(() => false),
      { emitEvent: false }
    );
    this.getSelectAllControl().patchValue(false, { emitEvent: false });
  }
}
