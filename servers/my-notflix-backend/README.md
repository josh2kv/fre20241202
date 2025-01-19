# My Notflix Backend

## Folder Structure

### Feature-based

- Easy to understand where to find code
- Good for smaller to medium projects
- Features are self-contained
- Easy to maintain and scale per feature
- Good for teams working on different features

### Example

```
src/
├── config/                 # Configuration files
│   ├── database.ts
│   └── env.ts
│
├── features/              # Group by feature/domain
│   ├── users/            # Everything related to users
│   │   ├── user.model.ts
│   │   ├── user.dto.ts
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.route.ts
│   │   └── user.test.ts
│   │
│   ├── auth/             # Authentication feature
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.route.ts
│   │   └── auth.middleware.ts
│   │
│   └── movies/           # Movie-related features
│       ├── movie.model.ts
│       ├── movie.controller.ts
│       ├── movie.service.ts
│       └── movie.route.ts
│
├── shared/               # Shared utilities and middleware
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   └── utils/
│       ├── response.util.ts
│       └── logger.util.ts
│
├── types/               # Type definitions
│   └── index.ts
│
├── app.ts
└── server.ts
```
