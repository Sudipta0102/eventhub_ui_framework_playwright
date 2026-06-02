import { test, expect } from '@playwright/test';
import { loginAsUser } from '../src/utils/APILogin';

test('Login Test via API', async({browser})=>{

    const ctx = await browser.newContext();

    const loginResponse = await loginAsUser(
        ctx,
        process.env.TEST_EMAIL!,
        process.env.TEST_PASSWORD!
    );

    const storedToken = await loginResponse.evaluate(()=>{
        return window.localStorage.getItem('eventhub_token');
    });

    console.log(`Token found on localstorage: ${storedToken}`);

    expect(storedToken).toBeTruthy();
    expect(storedToken?.length).toBeGreaterThan(10);
});