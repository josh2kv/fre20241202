# My Notflix Backend

## Folder Structure

### Example

```
├── src/
│   ├── core/           # Configuration files
│   │   ├── passport.ts   # Passport configuration
│   │   └── database.ts   # Database configuration
│   ├── controllers/      # Request handlers
│   │   ├── auth.ts       # Authentication controllers
│   │   ├── user.ts       # User-related controllers
│   │   └── movie.ts      # Movie-related controllers
│   ├── models/           # Database models
│   │   └── user.ts       # User model
│   ├── routes/           # API routes
│   │   ├── auth.ts       # Authentication routes
│   │   ├── user.ts       # User routes
│   │   └── movie.ts      # Movie routes
│   ├── services/         # Business logic
│   │   └── tmdb.ts       # TMDB API service
│   ├── middleware/       # Custom middleware
│   │   └── auth.ts       # Authentication middleware
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts     # Common types
│   └── app.ts           # Express app setup
├── package.json
└── tsconfig.json
```
