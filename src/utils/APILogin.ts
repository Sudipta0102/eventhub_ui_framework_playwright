import { BrowserContext, Page } from "@playwright/test";

export async function loginAsUser(
    context: BrowserContext, 
    username: string, 
    password:string): Promise<Page> {
    
    // 1. fetch the token via api request
    const loginResponse = await context.request.post(process.env.API_LOGIN_URL!, {

        data: {
            email: username,
            password: password
        }
    });

    if(!loginResponse.ok()){
        throw new Error(`Login failed for user: ${username}: ${loginResponse.statusText()}`);
    }

    const responseJson = await loginResponse.json();
    const token = responseJson.token;

    const page = await context.newPage();
    await page.goto(process.env.BASE_URL!); 

    // 2. Automatically inject the token into LocalStorage for every page
    // in this browser context
    await page.evaluate((tokenVal)=>{
        window.localStorage.setItem('eventhub_token', tokenVal);
    }, token);

    // 3. open the page and navigate to dashboard
    await page.reload({waitUntil: 'networkidle'}); 

    return page;

}