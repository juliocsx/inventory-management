export interface ResponseDto<T> {
  message: string;
  data?: T;
  error?: string;
}
