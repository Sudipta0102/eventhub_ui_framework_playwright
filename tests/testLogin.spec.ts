import {  test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';

test("login validation", async({page}) =>{

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    loginPage.navigate();

    loginPage.login("automachinemail314@gmail.com", "Choracchi@1234");

    //page.pause();

    await expect(dashboardPage.getFeaturedEventsHeading()).toBeVisible();

});

