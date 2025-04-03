export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];

  constructor(success: boolean, message: string, data?: T, errors?: any[]) {
    this.success = success;
    this.message = message;
    if (data) this.data = data;
    if (errors) this.errors = errors;
  }

  static success<T>(data: T, message: string = "Success") {
    return new ApiResponse(true, message, data);
  }

  static error(message: string, errors?: any[]) {
    return new ApiResponse(false, message, undefined, errors);
  }
}
