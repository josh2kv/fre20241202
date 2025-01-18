export const STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = STATUS_CODES.INTERNAL_SERVER_ERROR,
    public errors?: any[]
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Validation failed", errors?: any[]) {
    super(message, STATUS_CODES.BAD_REQUEST, errors);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, STATUS_CODES.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, STATUS_CODES.FORBIDDEN);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Not Found") {
    super(message, STATUS_CODES.NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Conflict") {
    super(message, STATUS_CODES.CONFLICT);
  }
}
