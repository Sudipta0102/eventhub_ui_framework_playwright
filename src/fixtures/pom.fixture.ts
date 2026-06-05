import { test as base } from '@playwright/test';
import { PageObjectManager } from '../pages/PageObjectManager';
import { type AuthFixtures } from './auth.fixture';
export type PomFixtures = {

    pom: PageObjectManager;
    pomWithAPIAuthenticatedPage: PageObjectManager;
    pomWithUIAuthenticatedPage: PageObjectManager;
}

export const pomTest = base.extend<PomFixtures & AuthFixtures>({
  
    pom: async ({ page }, use) =>{

        const pomManager = new PageObjectManager(page);
        await use(pomManager);
    },

    pomWithAPIAuthenticatedPage: async({ apiAuthenticatedPage }, use) =>{

        const pomManager = new PageObjectManager(apiAuthenticatedPage);
        await use(pomManager);

    },

    pomWithUIAuthenticatedPage: async({ uiAuthenticatedPage }, use)=>{

        const pomManager = new PageObjectManager(uiAuthenticatedPage);
        await use(pomManager);
    },

});