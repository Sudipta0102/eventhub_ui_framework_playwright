import { test as base } from '@playwright/test';
import { CustomApiClient } from "../utils/CustomApiClient";
import { type AuthFixtures } from './auth.fixture'; 

export type NetworkFixtures = {
    apiClient : CustomApiClient;
    //apiClientAuthenticated : CustomApiClient;
}

export const networkTest = base.extend<NetworkFixtures & AuthFixtures>({

    apiClient: async ({ request, apiAuthenticatedPage }, use)=>{

        // binding the current session directly custom apt client.
        const client = new CustomApiClient(request, apiAuthenticatedPage);

        // handing over to test
        await use(client);

    },

});

