import { type Locator, type Page } from "@playwright/test";

export class LoginPage { 

    private readonly page: Page;
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.email = page.locator("#email");
        this.password = page.locator("#password");
        this.loginBtn = page.locator("#login-btn");
    } 

    async navigate() { 
        await this.page.goto('/login');
    } 

    async login(username: string, password: string){

        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
        //await this.page.waitForLoadState('networkidle');
    }
}
