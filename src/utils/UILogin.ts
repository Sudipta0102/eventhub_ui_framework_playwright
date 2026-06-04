import { BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export async function uiLoginAsUser(
    context: BrowserContext, 
    username: string, 
    password: string): Promise<Page> {

    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(username, password);

    await page.waitForURL(process.env.BASE_URL!, { waitUntil: 'domcontentloaded' });
    return page;
}