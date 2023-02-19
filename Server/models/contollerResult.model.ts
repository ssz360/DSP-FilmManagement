export interface ControllerResponseModel<T> {
  error?: {
    code: number;
    message: string;
  };
  data?: T;
}
