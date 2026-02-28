import { test, expect } from '@playwright/test';

test('TC-001 Verify registration page UI elements ', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
  await expect(page.locator('input[name="lastName"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();

});

test('TC-002 Verify the Register button is disabled defauld', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
});

test('TC-003 Verify that the Register button is enabled after completing all required input fields.', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
  await page.locator('input[name="firstName"]').fill('Leonardo');
  await page.locator('input[name="lastName"]').fill('Iglesias');
  await page.locator('input[name="email"]').fill('testing@gmail.com');
  await page.locator('input[name="password"]').fill('password1234')

});

test('TC-004 Verify page redirection when clicking the Login button.', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('http://localhost:3000/login');

});

test('TC-005 Verify successful login with valid credentials.', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Leonardo');
  await page.locator('input[name="lastName"]').fill('Iglesias');
  await page.locator('input[name="email"]').fill('testing'+Date.now().toString()+'@gmail.com');
  await page.locator('input[name="password"]').fill('password1234')
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso!')).toBeVisible();
});

test('TC-006 Verify that the user cannot register a second time.', async ({ page }) => {
  const email = 'Leonardo'+Date.now().toString()+'@gmail.com';
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Leonardo');
  await page.locator('input[name="lastName"]').fill('Iglesias');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('password1234')
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso!')).toBeVisible();

  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Leonardo');
  await page.locator('input[name="lastName"]').fill('Iglesias');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('password1234')
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso!')).not.toBeVisible();

  



});
