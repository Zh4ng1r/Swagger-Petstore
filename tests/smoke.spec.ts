import { test, expect } from '@playwright/test';
import { getPetsByStatus } from '../src/endpoints/pet';

test('GET /pet/findByStatus smoke test', async () => {
  const pets = await getPetsByStatus('available');

  expect(Array.isArray(pets)).toBeTruthy();
  if (pets.length > 0) {
    expect(pets[0]).toHaveProperty('id');
    expect(pets[0]).toHaveProperty('name');
  }
});