import type { Pet } from '../types/pet';
import * as petEndpoints from '../endpoints/pet';
import type { ApiResponse } from '../types/api';

class PetService {
  async createPet(pet: Pet): Promise<ApiResponse<Pet>> {
    return petEndpoints.createPetEndpoint(pet);
  }

async getPetById(id: number): Promise<ApiResponse<Pet | undefined>> {
  try {
    const response = await petEndpoints.getPetByIdEndpoint(id);
    return { status: response.status, data: response.data };
  } catch (error: any) {
    return { status: error.response?.status, data: undefined };
  }
}

  async updatePet(pet: Pet): Promise<ApiResponse<Pet>> {
    return petEndpoints.updatePetEndpoint(pet);
  }

async deletePet(id: number): Promise<ApiResponse<void>> {
  try {
    const response = await petEndpoints.deletePetEndpoint(id);
    return { status: response.status, data: undefined };
  } catch (error: any) {
    return { status: error.response?.status, data: undefined };
  }
}

  async findByStatus(status: string): Promise<ApiResponse<Pet[]>> {
    return petEndpoints.findPetsByStatusEndpoint(status);
  }

  async uploadImage(petId: number, file: File): Promise<ApiResponse<any>> {
    return petEndpoints.uploadPetImageEndpoint(petId, file);
  }
}

export default new PetService();
