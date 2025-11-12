import { test, expect } from '@playwright/test';
import { getPetsByStatus } from '../src/endpoints/pet';

test('GET /pet/findByStatus smoke test', async ({ request }) => {
  const response = await getPetsByStatus('available');
  expect(response.status).toBe(200);

  const pets = response.data;

  if (pets) {
    const pet = pets[0];
    expect(pet).toHaveProperty('id');
    expect(pet).toHaveProperty('name');
  }
});
