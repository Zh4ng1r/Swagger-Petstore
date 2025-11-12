import { faker } from '@faker-js/faker';
import type { Pet } from '../types/pet';

export const generatePetData = (): Pet => ({
  id: Number(faker.string.numeric(3)),
  category: {
    id: Number(faker.string.numeric(3)),
    name: faker.animal.type(),
  },
  name: faker.person.firstName(),
  photoUrls: [faker.image.url()],
  tags: [
    {
      id: Number(faker.string.numeric(3)),
      name: faker.word.noun(),
    },
  ],
  status: 'available',
});
