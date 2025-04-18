import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, EMPTY, catchError, tap, map } from 'rxjs';
import { ResTestimonials, Testimonial } from '../interfaces/testimonials';

@Injectable({
  providedIn: 'root',
})
export class TestimonialsService {
  private readonly PROXY_URL = 'https://api.allorigins.win/get';
  private readonly BASE_URL =
    'https://api.frontendexpert.io/api/fe/testimonials';
  private readonly LIMIT = 5;
  private readonly testimonialsSubject = new BehaviorSubject<Testimonial[]>([]);
  readonly testimonials$ = this.testimonialsSubject.asObservable();
  private lastFetchedId: string | null = null;
  private hasNextState: boolean = true;

  constructor(private http: HttpClient) {}

  getTestimonials(): Observable<Testimonial[]> {
    if (!this.hasNextState) {
      return EMPTY;
    }

    let params = new HttpParams().set('limit', this.LIMIT.toString());

    if (this.lastFetchedId) {
      params = params.set('after', this.lastFetchedId);
    }

    const targetUrl = `${this.BASE_URL}?${params.toString()}`;
    const proxyUrl = `${this.PROXY_URL}?url=${encodeURIComponent(targetUrl)}`;

    return this.http.get<any>(proxyUrl).pipe(
      map((response) => {
        if (response && response.contents)
          return JSON.parse(response.contents) as ResTestimonials;

        throw new Error('Failed to parse response');
      }),
      tap((parsedResponse) => {
        this.hasNextState = parsedResponse.hasNext;
        const testimonials = parsedResponse.testimonials;

        if (testimonials && testimonials.length > 0) {
          const lastTestimonial = testimonials[testimonials.length - 1];
          this.lastFetchedId = lastTestimonial ? lastTestimonial.id : null;
          this.testimonialsSubject.next([
            ...this.testimonialsSubject.getValue(),
            ...testimonials,
          ]);
        } else {
          this.hasNextState = false;
        }
      }),
      map((parsedResponse) => parsedResponse.testimonials || []),
      catchError((err) => {
        console.error('Failed to fetch testimonials:', err);
        this.hasNextState = false;
        return EMPTY;
      })
    );
  }

  get hasNext(): boolean {
    return this.hasNextState;
  }

  reset(): void {
    this.testimonialsSubject.next([]);
    this.lastFetchedId = null;
    this.hasNextState = true;
  }
}
