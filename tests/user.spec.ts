import { step, attachment } from "allure-js-commons";
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import userService from "../src/services/userService";
import type { User } from "../src/types/user";

test.describe("User API - Positive Tests", () => {
  let user: User;
  let username: string;
  let password: string;

  test("Создание пользователя", async () => {
    username = faker.internet.username().toLowerCase();
    password = faker.internet.password();

    user = {
      id: faker.number.int({ min: 1, max: 10_000_000 }),
      username,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password,
      phone: faker.phone.number(),
      userStatus: 1,
    };

    await step("Создаём пользователя", async () => {
      const response = await userService.createUser(user);
      expect(response.status).toBe(200);
    });

    await attachment("User payload", JSON.stringify(user, null, 2), "application/json");
  });

  test("Логин пользователя", async () => {
    await step("Логинимся пользователем", async () => {
      const response = await userService.login(username, password);
      expect(response.status).toBe(200);
    });
  });

  test("Получение пользователя", async () => {
    const response = await userService.getUser(username);
    expect(response.status).toBe(200);
    expect(response.data?.username).toBe(username);
  });

  test("Удаление пользователя", async () => {
    const response = await userService.deleteUser(username);
    expect([200, 404]).toContain(response.status);
  });
});
