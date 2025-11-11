import axiosInstance from '../services/axiosInstance';
import type { Pet } from '../types/pet';

export const getPetsByStatus = async (status: string): Promise<Pet[]> => {
  return axiosInstance.get('/pet/findByStatus', { status });
};

export const addPet = async (petData: any) => {
  return axiosInstance.post('/pet', petData);
};
