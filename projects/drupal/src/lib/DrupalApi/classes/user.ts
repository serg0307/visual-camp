import axios from "axios";

import { LoginRequestInterface } from "../interfaces/User/login-request";
import { RegisterRequestInterface } from "../interfaces/User/register-request";
import { LoginResponse } from "../interfaces/User/login-response";
import { env_enum } from "../environment";


export class JsonApiUser {
  static config = {
    headers: {
      'Accept': 'application/json',
    }
  }
  /**
   * Login user
   * @param {LoginRequestInterface} data
   * @returns {LoginResponse}
   */
  static async Login(data: LoginRequestInterface): Promise<LoginResponse> {
    const result = await axios
      .post(`${env_enum.BACKEND_URL}/${env_enum.PATH}/user/login?_format=json`, data, JsonApiUser.config)
      .catch((error) => {
        throw new Error(error);
      })
      .then((res) => {
        return res;
      });
    return result.data;
  }
  /**
   * Register user
   * @param {RegisterRequestInterface} data
   * @returns {LoginResponse}
   */
  static async Register(data: RegisterRequestInterface): Promise<LoginResponse> {

    const result = await axios
      .post(`${env_enum.BACKEND_URL}/${env_enum.PATH}/user/register?_format=json`, data, JsonApiUser.config)
      .catch((error) => {
        throw new Error(error.response.data.message);
      })
      .then((res) => {
        return res;
      });
    return result.data;
  }

  static Logout() {
    return;
  }
}
