import axiosInstance from '../services/axiosInstance';
import type { Pet } from '../types/pet';

interface ApiResponse<T> {
  status: number;
  data: T;
}

export const findPetsByStatusEndpoint = async (status: string): Promise<ApiResponse<Pet[]>> => {
  const response = await axiosInstance.get<Pet[]>('/pet/findByStatus', {
    params: { status },
  });
  return { status: response.status, data: response.data };
};

export const createPetEndpoint = async (pet: Pet): Promise<ApiResponse<Pet>> => {
  const response = await axiosInstance.post<Pet>('/pet', pet);
  return { status: response.status, data: response.data };
};

export const getPetByIdEndpoint = async (id: number): Promise<ApiResponse<Pet>> => {
  const response = await axiosInstance.get<Pet>(`/pet/${id}`);
  return { status: response.status, data: response.data };
};

export const updatePetEndpoint = async (pet: Pet): Promise<ApiResponse<Pet>> => {
  const response = await axiosInstance.put<Pet>('/pet', pet);
  return { status: response.status, data: response.data };
};

export const deletePetEndpoint = async (id: number): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.delete(`/pet/${id}`);
  return { status: response.status, data: undefined };
};
