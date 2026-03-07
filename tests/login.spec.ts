import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import testData from '../data/testData.json';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
});

test('TC-007 Verify successful login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/signup');
    await page.getByTestId('boton-login-header-signup').click();
    await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
    await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('testing@gmail.com');
    await page.getByRole('textbox', { name: 'Contraseña' }).click();
    await page.getByRole('textbox', { name: 'Contraseña' }).fill('Nm!2Caucho');
    await page.getByTestId('boton-login').click();
    await page.getByText('Inicio de sesión exitoso').click();
    await page.getByTestId('titulo-dashboard').click();
});