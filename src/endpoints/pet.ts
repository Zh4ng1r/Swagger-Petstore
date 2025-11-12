import axiosInstance from '../services/axiosInstance';
import type { Pet } from '../types/pet';

export const getPetsByStatus = async (
  status: string
) => {
  return axiosInstance.get<Pet[]>('/pet/findByStatus', {
    params: { status },
  });
};

export const addPet = async (
  petData: Pet
) => {
  return axiosInstance.post<Pet>('/pet', petData);
};
