import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import testData from '../data/testData.json';

let registerPage: RegisterPage;


test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.visitRegisterPage();
});

test('TC-001 Verify registration page UI elements ', async ({ page }) => {
  await expect(registerPage.firstNameInput).toBeVisible();
  await expect(registerPage.lastNameInput).toBeVisible();
  await expect(registerPage.emailInput).toBeVisible();
  await expect(registerPage.passwordInput).toBeVisible();
  await expect(registerPage.registerButton).toBeVisible();
});

test('TC-002 Verify the Register button is disabled defauld', async ({ page }) => {
  await registerPage.visitRegisterPage();
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
});

test('TC-003 Verify that the Register button is enabled after completing all required input fields.', async ({ page }) => {
await registerPage.FormRegisterComplete(testData.users.firstName, testData.users.lastName, testData.users.email, testData.users.password);
await expect(registerPage.registerButton).toBeEnabled();
});

test('TC-004 Verify page redirection when clicking the Login button.', async ({ page }) => {
await expect(page).toHaveURL('http://localhost:3000/signup');
await page.getByTestId('boton-login-header-signup').click();
await expect(page).toHaveURL('http://localhost:3000/login');

});

test('TC-005 Verify successful registration with valid credentials', async ({ page }) => {
  const uniqueEmail = `test${Date.now()}@mail.com`;
  await registerPage.completeYClickRegister(
    testData.users.firstName,
    testData.users.lastName,
    uniqueEmail,
    testData.users.password
  );

  await expect(page.getByText('Registro exitoso!')).toBeVisible(); // mail already in use
});


test('TC-006 Verify that the user cannot register a second time.', async ({ page }) => {

  const email = 'leonardi' + Date.now().toString() + '@gmail.com';

  await registerPage.completeYClickRegister('Leonardo', 'Iglesias', email, 'Nm!2Caucho');
  await expect(page.getByText('Registro exitoso!')).toBeVisible();
  await registerPage.visitRegisterPage();
  await registerPage.completeYClickRegister('Leonardo', 'Iglesias', email, 'Nm!2Caucho');
  await expect(page.getByText('email already in use')).toBeVisible();

});

test('TC-008 Verify signup endpoint returns 201 and valid body structure', async ({ request }) => {
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

