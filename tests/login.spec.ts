import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import testData from '../data/testData.json';
import { DashboardPage } from '../pages/dashboardPage';

test('TC-007 Verify successful login with valid credentials', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    const email = `testuser+${Date.now()}@mail.com`;
    const password = testData.users.password;

    await registerPage.visitRegisterPage();
    await registerPage.completeYClickRegister(
        testData.users.firstName,
        testData.users.lastName,
        email,
        password
    );
    await expect(page.getByText('Registro exitoso!')).toBeVisible();

    await loginPage.visit();
    await loginPage.login(email, password);

    await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
    await expect(dashboardPage.dashboardTitle).toBeVisible();
});

// 

test('TC-008 Verify signup endpoint returns 201 and correct JSON structure', async ({ request }) => {
  const payload = {
    firstName: testData.users.firstName,
    lastName: testData.users.lastName,
    email: `apiuser+${Date.now()}@mail.com`,
    password: testData.users.password
  };

  const response = await request.post('http://localhost:6007/api/auth/signup', { data: payload });
  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body).toHaveProperty('token');
  expect(typeof body.token).toBe('string');

  expect(body).toHaveProperty('user');
  expect(body.user).toMatchObject({
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email
  });
  expect(body.user.id).toBeTruthy();
});

test('TC-011 Log in using a newly created user account provisioned through the backend.', async ({ request, page }) => {
  const payload = {
    firstName: testData.users.firstName,
    lastName: testData.users.lastName,
    email: `apiuser+${Date.now()}@mail.com`,
    password: testData.users.password
  };

  const response = await request.post('http://localhost:6007/api/auth/signup', { data: payload });
  expect(response.status()).toBe(201);

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.visit();
  await loginPage.login(payload.email, payload.password);

  await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
  await expect(dashboardPage.dashboardTitle).toBeVisible();
});
