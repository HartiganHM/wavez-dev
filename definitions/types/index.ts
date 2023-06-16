export * from './devices';
export * from './nanoleaf';

export interface ErrorResponse {
  status: number;
  message: string;
  friendlyMessage: string;
}
