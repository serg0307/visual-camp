export interface LoginResponse {
  access_token: string;
  current_user: {
    uid: number;
  };
}
