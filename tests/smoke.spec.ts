import { test, expect } from '@playwright/test';
import petService from '../src/services/petService';

test('GET /pet/findByStatus smoke test', async ({ request }) => {
  const { status: getStatus, data: pets } = await petService.findByStatus('available');
  console.log(getStatus, pets);
  expect(getStatus).toBe(200);;

  if (pets) {
    const pet = pets[0];
    expect(pet).toHaveProperty('id');
    expect(pet).toHaveProperty('name');
  }
});
