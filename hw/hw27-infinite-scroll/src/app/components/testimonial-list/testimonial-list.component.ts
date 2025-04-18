import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestimonialsService } from '../../services/testimonials.service';
import { Subject, takeUntil, finalize, Observable } from 'rxjs';
import { Testimonial } from '../../interfaces/testimonials';

@Component({
  selector: 'app-testimonial-list',
  standalone: false,
  templateUrl: './testimonial-list.component.html',
  styleUrl: './testimonial-list.component.css',
})
export class TestimonialListComponent implements OnInit, OnDestroy {
  private readonly THRESHOLD = 32;
  private readonly destroy$ = new Subject<void>();
  readonly testimonials$: Observable<Testimonial[]>;
  isLoading: boolean = false;

  constructor(private testimonialsService: TestimonialsService) {
    this.testimonials$ = this.testimonialsService.testimonials$;
  }

  ngOnInit(): void {
    this.testimonialsService.reset();
    this.loadMoreTestimonials();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMoreTestimonials(): void {
    if (this.isLoading || !this.testimonialsService.hasNext) return;

    this.isLoading = true;

    this.testimonialsService
      .getTestimonials()
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const isNearBottom =
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + this.THRESHOLD;

    if (isNearBottom) {
      this.loadMoreTestimonials();
    }
  }
}
