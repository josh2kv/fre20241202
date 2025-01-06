# Hw10: Notflix Frontend

## Pages

✅ Done, 🟢 To Review, 🔵 In Progress, ⚪️ Not Started

| Page | UI/Layout | Features | API Integration | Sub Tasks | Note |
|-------------|:---------------:|:---------:|:---------------:|:-------------|:-----|
| Home | 🟢 | 🟢 | N/A | - Hero section<br> - Email form |  |
| Login | 🟢 | 🟢 | ⚪️ | - Form validation<br>- Error handling |  |
| Register | 🟢 | 🟢 | ⚪️ | - Credentials step<br>- Account step<br>- Plan step |  |
| Movie List | 🟢 | 🟢 | ⚪️ | - Movie grid<br>- Movie card |  |
| Movie Detail | ⚪️ | ⚪️ | ⚪️ | - Video player<br>- Movie info |  |

## Folder structure: Organize by features([Link](https://medium.com/@marketing_26756/angular-best-practices-tips-for-project-structure-and-organization-490ca7950829))

- A "feature" is a distinct functionality or business domain.
  
### Example

  ```bash
  src/
  ├── app/
  │   ├── features/                    # Feature modules
  │   │   ├── browse/                  # Browse movies feature
  │   │   │   ├── components/
  │   │   │   │   ├── movie-card/
  │   │   │   │   ├── movie-grid/
  │   │   │   │   └── genre-filter/
  │   │   │   ├── services/
  │   │   │   │   └── browse.service.ts
  │   │   │   └── browse.module.ts
  │   │   │
  │   │   ├── player/                  # Video player feature
  │   │   │   ├── components/
  │   │   │   │   ├── video-player/
  │   │   │   │   └── player-controls/
  │   │   │   ├── services/
  │   │   │   │   └── player.service.ts
  │   │   │   └── player.module.ts
  │   │   │
  │   │   └── auth/                    # Authentication feature
  │   │       ├── components/
  │   │       │   ├── login-form/
  │   │       │   └── register-form/
  │   │       ├── services/
  │   │       │   └── auth.service.ts
  │   │       └── auth.module.ts
  │   │
  │   ├── pages/                       # Page modules
  │   │   ├── home/                    # Home page
  │   │   │   ├── home.component.ts
  │   │   │   ├── home.module.ts
  │   │   │   └── home-routing.module.ts
  │   │   │
  │   │   ├── movie-details/           # Movie details page
  │   │   │   ├── components/          # Page-specific components
  │   │   │   │   └── movie-meta/
  │   │   │   ├── movie-details.component.ts
  │   │   │   ├── movie-details.module.ts
  │   │   │   └── movie-details-routing.module.ts
  │   │   │
  │   │   └── auth/                    # Auth pages
  │   │       ├── login/
  │   │       │   └── login.component.ts
  │   │       ├── register/
  │   │       │   └── register.component.ts
  │   │       ├── auth-pages.module.ts
  │   │       └── auth-pages-routing.module.ts
  │   │
  │   ├── core/                        # Singleton services, app-level components, guards
  │   │   ├── guards/
  │   │   │   └── auth.guard.ts
  │   │   ├── interceptors/
  │   │   │   └── token.interceptor.ts
  │   │   ├── services/
  │   │   │   └── api.service.ts
  │   │   ├── layouts/
  │   │   │   ├── header/
  │   │   │   └── footer/
  │   │   ├── config/
  │   │   └── core.module.ts
  │   │
  │   ├── shared/                      # Shared components, pipes, directives
  │   │   ├── components/
  │   │   │   ├── button/
  │   │   │   └── modal/
  │   │   ├── directives/
  │   │   ├── pipes/
  │   │   ├── utils/
  │   │   └── shared.module.ts
  │   │
  │   ├── app.component.ts
  │   ├── app.module.ts
  │   └── app-routing.module.ts
  |
  ├── assets/                  # Static assets (images, icons, etc.)
  │   ├── images/
  │   └── icons/
  |
  ├── environments/           # Environment configurations
  │   ├── environment.template.ts
  │   ├── environment.prod.template.ts
  │   ├── environment.ts
  │   └── environment.prod.ts
  │
  └── styles/                  # Global styles
      ├── _variables.scss
      ├── _mixins.scss
      └── styles.scss
  ```

1. `core/` - Contains singleton services and app-level components that should be loaded only - once:
   - Services for API calls, authentication
   - Guards for route protection
   - HTTP interceptors
   - App-wide layout components(header, footer, sidebar)
   - `CoreModule` should be imported only in `AppModule`
   - Core services remain in the core module
2. `features/` - Contains feature modules, each representing a main section of your app:
   - `auth/` - Login/signup functionality
   - `browse/` - Main movie browsing interface
   - `details/` - Movie/show detail pages
   - `profile/` - User profile management
3. `shared/` - Contains reusable components, directives, and pipes:
   - Movie card component
   - Rating component
   - Loading spinner
   - Common pipes and directives
   - Should be imported in feature modules as needed
   - Shared components stay in the shared module
4. `pages/` - Contains page modules that compose features together:
   - `home/` - Landing page with featured content
   - `browse/` - Movie browsing pages
   - `movie-details/` - Individual movie pages
   - `profile/` - User profile pages
   - Pages can still use components from other features by importing those feature modules

### Benefits of this approach

- **Lazy Loading**: Each page module loads only when needed
- **Encapsulation**: Page-specific components stay with their page
- **Better Organization**: Clear separation between shared and page-specific components
- **Scalability**: Easy to add new features within each page module
- **Performance**: Better initial load time due to code splitting

### Remember to

- Keep shared components that are used across multiple pages in the shared module
- Keep page-specific components within their respective page modules
- Use lazy loading for all page modules
- Import `SharedModule` in each page module that needs shared components

## Stick to Reactive Forms over Template-driven Forms throughout an app

- Many Angular developers and teams choose to standardize on Reactive Forms for their projects, even for simple forms.
- This approach is:
  - More idiomatic Angular
  - Less error-prone
  - More maintainable
  - Better integrated with Angular's form system

## Services

- Services are singleton classes that handle data and logic separate from components.
- Singleton by default when provided in root
- Injectable into components and other services
- Can maintain state
- Can communicate with APIs
- Can be shared across the app

### Common Uses

- API communication
- State management
- Authentication
- Data caching
- Business logic
- Utility functions

### Root-level Services VS Module-level Services

- Root-level(Singleton)
  - Most services should use providedIn: 'root'
  - Module providers are for special cases
  - Core services always go in root
  - Feature services depend on their scope
  - Consider lazy loading implications
  - This approach:
    - Simplifies dependency injection
    - Ensures proper singleton behavior
    - Works better with tree-shaking
    - Makes services easier to test
    - Reduces configuration errors

- Module-level
  - You want a new instance of the service for each lazy-loaded module
  - The service is specific to a feature and shouldn't be available elsewhere
  - You need different configurations of the same service

## Core Module

- Core Module should include:
  - Singleton services with providedIn: 'root'
  - HTTP interceptors
  - Global guards
  - App-level components (like header/footer)
  - Single-instance components
  - Global error handlers
- You don't need CoreModule if you only have services with providedIn: 'root'.

## How to manage interfaces

```bash
src/
├── app/
│   ├── core/
│   │   └── interfaces/           # Core-related interfaces
│   │       ├── auth.interface.ts
│   │       └── api.interface.ts
│   │
│   ├── shared/
│   │   └── interfaces/          # Shared interfaces
│   │       ├── index.ts         # Re-exports
│   │       ├── movie.interface.ts
│   │       ├── user.interface.ts
│   │       └── common.interface.ts
│   │
│   ├── features/
│   │   ├── movie-list/
│   │   │   └── interfaces/      # Feature-specific interfaces
│   │   │       └── movie-filter.interface.ts
│   │   │
│   │   └── movie-detail/
│   │       └── interfaces/
│   │           └── movie-detail.interface.ts
│   │
│   └── pages/                   # Pages use shared/feature interfaces
```

## Eager Loading VS Lazy Loading

1. Eager Loading

   - The module is imported in `AppModule`'s imports array
   - Components are declared in their own feature modules (like HomeModule)
   - The route configuration uses the component reference

2. Lazy Loading

    - The module is NOT imported in `AppModule`
    - The route configuration uses `loadChildren` to load the entire module when needed

## `ng-template` VS `ng-container` VS `ng-content`

|  | ng-template | ng-container | ng-content |
|---------|------------|--------------|------------|
| Main Purpose | Template definition | Logical grouping | Content projection |
| Renders to DOM | No | No | Yes |
| Common Use | Conditional content | Multiple structural directives | Component wrapper |

1. `ng-template`: Loading State

    ```html
    <!-- Loading state template -->
    <ng-template #loading>
      <div>Loading...</div>
    </ng-template>

    <div *ngIf="data; else loading">
      {{ data }}
    </div>
    ```

2. `ng-container`: Multiple Structural Directives

    ```html
    <!-- Multiple conditions and loops -->
    <ng-container *ngIf="isLoggedIn">
      <ng-container *ngFor="let item of items">
        <div>{{ item }}</div>
      </ng-container>
    </ng-container>
    ```

3. `ng-content`: Layout Wrapper

    ```html
    <!-- Card component template -->
    <app-card>
      <h2>Card Title</h2>
      <p>Card content</p>
    </app-card>

    <!-- card.component.html -->
    <div class="card">
      <ng-content></ng-content>
    </div>
    ```
