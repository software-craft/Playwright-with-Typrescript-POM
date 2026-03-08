import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import testData from '../data/testData.json';

test('TC-007 Verify successful login with valid credentials', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

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
    await expect(page.getByTestId('titulo-dashboard')).toBeVisible();
});