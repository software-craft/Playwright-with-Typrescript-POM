import {Page, Locator} from '@playwright/test';


export class LoginPage{
    
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {

        this.page = page;
        
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByTestId('boton-login-header-signup');
    }

    async visitloginPage() {
        await this.page.goto('http://localhost:3000/login');
        await this.page.waitForLoadState('networkidle');
    }
    
    async FormRegisterComplete(email: string, password: string) {

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async ClickRegisterButton() {
        await this.loginButton.click();
    }

    async completeYClickRegister(firstName: string, lastName: string, email: string, password: string) {
    await this.FormRegisterComplete(email, password);
    await this.ClickRegisterButton();
    }
}