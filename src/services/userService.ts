import type { User } from '../types/user';
import * as userEndpoints from '../endpoints/user';
import type { ApiResponse } from '../types/api';

class UserService {
  async createUser(user: User): Promise<ApiResponse<User>> {
    return userEndpoints.createUserEndpoint(user);
  }

  async getUser(username: string): Promise<ApiResponse<User | undefined>> {
    try {
      const response = await userEndpoints.getUserEndpoint(username);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return { status: error.response?.status, data: undefined };
    }
  }

  async updateUser(username: string, user: User): Promise<ApiResponse<User>> {
    return userEndpoints.updateUserEndpoint(username, user);
  }

  async deleteUser(username: string): Promise<ApiResponse<void>> {
    try {
      const response = await userEndpoints.deleteUserEndpoint(username);
      return { status: response.status, data: undefined };
    } catch (error: any) {
      return { status: error.response?.status, data: undefined };
    }
  }

  async login(username: string, password: string): Promise<ApiResponse<string>> {
    return userEndpoints.loginEndpoint(username, password);
  }

  async logout(): Promise<ApiResponse<void>> {
    return userEndpoints.logoutEndpoint();
  }
}

export default new UserService();
