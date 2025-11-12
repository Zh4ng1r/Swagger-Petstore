import type { Pet } from '../types/pet';
import * as petEndpoints from '../endpoints/pet';

interface ApiResponse<T> {
  status: number;
  data: T;
}

class PetService {
  async createPet(pet: Pet): Promise<ApiResponse<Pet>> {
    return petEndpoints.createPetEndpoint(pet);
  }

  async getPetById(id: number): Promise<ApiResponse<Pet>> {
    return petEndpoints.getPetByIdEndpoint(id);
  }

  async updatePet(pet: Pet): Promise<ApiResponse<Pet>> {
    return petEndpoints.updatePetEndpoint(pet);
  }

  async deletePet(id: number): Promise<ApiResponse<void>> {
    return petEndpoints.deletePetEndpoint(id);
  }

  async findByStatus(status: string): Promise<ApiResponse<Pet[]>> {
    return petEndpoints.findPetsByStatusEndpoint(status);
  }

  async uploadImage(petId: number, file: File): Promise<ApiResponse<any>> {
    return petEndpoints.uploadPetImageEndpoint(petId, file);
  }
}

export default new PetService();
