import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';


test('TC-001 Verify registration page UI elements ', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.visitRegisterPage();
  await expect(registerPage.firstNameInput).toBeVisible();
  await expect(registerPage.lastNameInput).toBeVisible();
  await expect(registerPage.emailInput).toBeVisible();
  await expect(registerPage.passwordInput).toBeVisible();
  await expect(registerPage.registerButton).toBeVisible();
});

test('TC-002 Verify the Register button is disabled defauld', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.visitRegisterPage();
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
});

test('TC-003 Verify that the Register button is enabled after completing all required input fields.', async ({ page }) => {
const registerPage = new RegisterPage(page);
await registerPage.visitRegisterPage();
await registerPage.FormRegisterComplete('Leonardo', 'Iglesias', 'testing@gmail.com', 'Nm!2Caucho');
await expect(registerPage.registerButton).toBeEnabled();
});

test('TC-004 Verify page redirection when clicking the Login button.', async ({ page }) => {
  const registerPage = new RegisterPage(page);
await registerPage.visitRegisterPage();
await registerPage.ClickRegisterButton();
await expect(page).toHaveURL('http://localhost:3000/login');

});

test('TC-005 Verify successful login with valid credentials.', async ({ page }) => {
const registerPage = new RegisterPage(page);
await registerPage.visitRegisterPage();
await registerPage.completeYClickRegister('Leonardo', 'Iglesias', 'testing' + Date.now().toString() + '@email.com', 'Nm!2Caucho');
await registerPage.ClickRegisterButton();
await expect(page.getByText('Registro exitoso!')).toBeVisible();
});

test('TC-006 Verify that the user cannot register a second time.', async ({ page }) => {

  const email = 'leonardoiglesias' + Date.now().toString() + '@gmail.com';
  const registerPage = new RegisterPage(page);
  await registerPage.visitRegisterPage();
  await registerPage.completeYClickRegister('Leonardo', 'Torres', email, 'Nm!2Caucho' );
  await expect(page.getByAltText('Registro exitoso!')).toBeVisible();
  await registerPage.visitRegisterPage();
  await registerPage.completeYClickRegister('Leonardo', 'Iglesias', email, 'Nm!2Caucho');
  await expect(page.getByAltText('Email already in use')).toBeVisible();
  await expect(page.getByAltText('Registro exitoso!')).not.toBeVisible();
});
