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
  constructor(message: string, errors?: any[]) {
    super(message, STATUS_CODES.BAD_REQUEST, errors);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.CONFLICT);
  }
}
