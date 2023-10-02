import { TokenPayload } from "./interfaces/token-payload";
import { IUser } from "./interfaces/User/user";

/**
 * JWT Workaround static functions
 *
 * @Todo Store revoked tokens collection.
 */

export class JWT {
  /**
   * Token expiration check
   * @param {string} token
   * @returns {boolean} true if token is expired
   */
  static isTokenExpired(token: string): boolean {
    const payload = this.getAccessTokenPayload(token);
    return payload.exp < new Date();
  }

  /**
   * removes Bearer part of authorization string
   * @param {string} authorization
   * @returns {string} - JWT or '' if authorization is empty
   */
  static refineToken(authorization: string): string {
    if (authorization)
      return authorization.replace('Bearer ', '');
    else
      return '';
  }

  /**
   * Get user id value from token
   * @param {string} token - JWT
   * @returns {number} - user id or 0 if value not found.
   */
  static getUidFromToken(token: string): number {
    const payload = this.getAccessTokenPayload(token);
    if (payload){
      return payload.drupal.uid;
    }
    return 0;
  }

  /**
   * Get payload data from token
   * @param {string} token - JWT
   * @returns {TokenPayload} - data object. empty if failed to define.
   */
  static getAccessTokenPayload(token: string): TokenPayload {
    try {
      const array = token.split('.');
      const payload = JSON.parse(atob(array[1]));
      payload.exp = new Date(payload.exp*1000);
      payload.iat = new Date(payload.iat*1000);
      return payload;
    } catch (Error) {
      return <TokenPayload>{};
    }
  }
  /**
   * Check if user owns entity.
   * Takes any object, extracts author.id
   * Compares to uid from token
   * @param {string} token
   * @param {IUser} user
   * @returns {boolean}
   */
  static isTokenOwner(token: string, user: IUser): boolean {
    if (!user?.id) {
      return false;
    }
    return JWT.getUidFromToken(token) == user.id;
  }
}
