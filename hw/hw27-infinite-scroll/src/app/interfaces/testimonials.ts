export interface Testimonial {
  id: string;
  message: string;
}

export interface ResTestimonials {
  hasNext: boolean;
  testimonials: Testimonial[];
}
