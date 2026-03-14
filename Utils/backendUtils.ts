import { Page, Locator, APIRequestContext } from '@playwright/test';
import testData from '../data/testData.json';

export class BackendUtils {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByTestId('boton-login');
    }

    async navigateToLogin(endpoint: string = 'http://localhost:3000/login') {
        await this.page.goto(endpoint);
        await this.page.waitForLoadState('networkidle');
    }

    async fillLoginForm(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(email: string, password: string) {
        await this.navigateToLogin();
        await this.fillLoginForm(email, password);
        await this.clickLoginButton();
    }

    async sendSignupRequest(request: APIRequestContext, payload?: { firstName?: string; lastName?: string; email?: string; password?: string; }) {
        const body = {
            firstName: payload?.firstName ?? testData.users.firstName,
            lastName: payload?.lastName ?? testData.users.lastName,
            email: payload?.email ?? `apiuser+${Date.now()}@mail.com`,
            password: payload?.password ?? testData.users.password,
        };

        const response = await request.post('http://localhost:6007/api/auth/signup', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: body,
        });

        const responseBody = await response.json();
        return { response, responseBody };
    }
}
