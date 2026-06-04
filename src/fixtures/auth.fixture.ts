import { test as base, type Page} from '@playwright/test';
import { loginAsUser } from '../utils/APILogin';
import { uiLoginAsUser } from '../utils/UILogin';

// declaring the type of custom fixture
type AuthFixtures = {
    apiAuthenticatedPage : Page;
    uiAuthenticatedPage : Page;
}

// extend the base playwright test runner with custom login logic
export const test = base.extend<AuthFixtures>({

    apiAuthenticatedPage: async ({ browser }, use) =>{

        const context = await browser.newContext();

        const page = await loginAsUser(
            context,
            process.env.TEST_EMAIL!,
            process.env.TEST_PASSWORD!
        );

        await use(page);

        await context.close();
    },

    uiAuthenticatedPage: async ({ browser }, use) =>{

        const context = await browser.newContext();

        const page = await uiLoginAsUser(
            context,
            process.env.TEST_EMAIL!,
            process.env.TEST_PASSWORD!
        );

        await use(page);

        await context.close();
    },
});

export { expect } from '@playwright/test';