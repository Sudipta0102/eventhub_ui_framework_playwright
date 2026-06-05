import { type Page } from '@playwright/test';

export class ManageBookingPage{
    
    private readonly page: Page;

    constructor(page:Page){
        this.page = page;
    }

}