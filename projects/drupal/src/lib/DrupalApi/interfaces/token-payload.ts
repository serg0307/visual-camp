export interface TokenPayload {
  iat: Date;
  exp: Date;
  drupal: {
    uid: number;
  }
}
