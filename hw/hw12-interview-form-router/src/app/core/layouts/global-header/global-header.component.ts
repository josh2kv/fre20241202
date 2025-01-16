import { ROUTE_PATHS } from '@/core/config/routes';
import { Component } from '@angular/core';

@Component({
  selector: 'app-global-header',
  standalone: false,

  templateUrl: './global-header.component.html',
  styleUrl: './global-header.component.scss',
})
export class GlobalHeaderComponent {
  toDirectory = ROUTE_PATHS.DIRECTORY;
  toContactUs = ROUTE_PATHS.CONTACT_US;
  toAbout = ROUTE_PATHS.ABOUT;
  activeLinkClass = 'active-link';
}
