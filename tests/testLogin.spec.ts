// import {  test, expect } from '@playwright/test';
// import { LoginPage } from '../src/pages/LoginPage';
// import { DashboardPage } from '../src/pages/DashboardPage';
import { test, expect } from '../src/fixtures';

test("login validation", async({pom}) =>{

    // const loginPage = new LoginPage(page);
    // const dashboardPage = new DashboardPage(page);

    await pom.loginPage.navigate();

    await pom.loginPage.login("automachinemail314@gmail.com", "Choracchi@1234");

    //page.pause();

    await expect(pom.dashboardPage.getFeaturedEventsHeading()).toBeVisible();

});

