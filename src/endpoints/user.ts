import axiosInstance from '../services/axiosInstance';
import type { User } from '../types/user';
import type { ApiResponse } from '../types/api';

export const createUserEndpoint = async (user: User): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.post<User>('/user', user);
  return { status: response.status, data: response.data };
};

export const getUserEndpoint = async (username: string): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.get<User>(`/user/${username}`);
  return { status: response.status, data: response.data };
};

export const updateUserEndpoint = async (username: string, user: User): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.put<User>(`/user/${username}`, user);
  return { status: response.status, data: response.data };
};

export const deleteUserEndpoint = async (username: string): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.delete(`/user/${username}`);
  return { status: response.status, data: undefined };
};

export const loginEndpoint = async (username: string, password: string): Promise<ApiResponse<string>> => {
  const response = await axiosInstance.get<string>('/user/login', {
    params: { username, password },
  });
  return { status: response.status, data: response.data };
};

export const logoutEndpoint = async (): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.get('/user/logout');
  return { status: response.status, data: undefined };
};
