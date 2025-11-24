import fs from "fs";
import path from "path";

import { step, attachment } from "allure-js-commons";
import { test, expect } from "@playwright/test";
import petService from "../src/services/petService";
import { generatePetData } from "../src/helpers/petFactory";
import type { Pet } from "../src/types/pet";

test.describe("Pet API - Positive Tests", () => {
  let pet: Pet;

  test("Cоздание питомца", async () => {
    pet = generatePetData();

    await step("Создаём питомца", async () => {
      const response = await petService.createPet(pet);
      expect(response.status).toBe(200);
      console.log(response.data, 'созданный питомец');
      expect(response.data).toMatchObject({ id: pet.id, name: pet.name });
    });

    await attachment("Pet payload", JSON.stringify(pet, null, 2), "application/json");
  });

  test("Получение питомца", async () => {
    await new Promise(res => setTimeout(res, 500)); // Ждём, чтобы сервер успел обработать создание

    const response = await petService.getPetById(pet.id!);
    expect(response.status).toBe(200);
    expect(response.data?.id).toBe(pet.id);
  });

  test("Обновление питомца", async () => {
    const updatedPet = { ...pet, name: "Updated", status: "sold" as const };
    const response = await petService.updatePet(updatedPet);
    expect(response.status).toBe(200);
    expect(response.data.status).toBe("sold");
    pet = updatedPet;
  });

  test("Фильтрация по статусу", async () => {
    const response = await petService.findByStatus("available");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBeTruthy();
    response.data.forEach(p => expect(p.status).toBe("available"));
  });

  test("Удаление питомца", async () => {
    const response = await petService.deletePet(pet.id!);
    console.log(response.status, 'удаление питомца');
    expect([200, 404]).toContain(response.status);
  });
});

test.describe("Pet API - Negative", () => {
  test("Питомец не найден", async () => {
    const randomBytes = Array.from({ length: 8 }, () => Math.round(Math.random() * 0xFF));

    const response = await petService.getPetById(Number(`0x${randomBytes}`));
    expect(response.status).toBe(404);
  });

  test("Обновление несуществующего питомца", async () => {
    const fakePet: Pet = { id: 999999, name: "Fake", status: "available" };
    const response = await petService.updatePet(fakePet);
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject(fakePet);
  });

  test("Удаление не существующего питомца", async () => {
    const response = await petService.deletePet(9999950398450);
    expect(response.status).toBe(404);
  });

  test("Неверный формат файла при загрузке изображения", async () => {
    const badFile = new File(["dummy"], "pet.txt", { type: "text/plain" });
    try {
      await petService.uploadImage(999999, badFile);
    } catch (error: any) {
      expect(error.response.status).toBe(415); // Неверный формат
    }
  });
});
