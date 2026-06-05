import { type Page } from '@playwright/test';

export class BookNowPage{
    
    private readonly page:Page;

    constructor(page:Page){
        this.page=page;
    }
}