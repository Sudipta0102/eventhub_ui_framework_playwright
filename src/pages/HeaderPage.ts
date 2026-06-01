import { type Page, type Locator} from '@playwright/test';

export class HeaderPage{

    private readonly page: Page;
    private readonly eventBtn: Locator;
    private readonly myBookingBtn: Locator;
    private readonly adminLink: Locator;
    private readonly manageEventsBtn: Locator;
    private readonly manageBookingsBtn: Locator; 

    constructor(page: Page){
        this.page = page;
        this.eventBtn = page.getByTestId('nav-events');
        this.myBookingBtn = page.getByTestId('nav-bookings');
        this.adminLink = page.getByRole('button', {name: 'Admin'});
        
        const adminContainer = page
                            .locator('div.relative')
                            .filter({has: this.adminLink});
        
        this.manageEventsBtn = adminContainer.getByRole('link', {name: 'Manage Events'});
        this.manageBookingsBtn = adminContainer.getByRole('link', {name: 'Manage Bookings'});    
    }

    async goToEvents(){
        await this.eventBtn.click();
    }

    async goToMyBookings(){
        await this.myBookingBtn.click();
    }

    async createNewEvent(){
        await this.manageEventsBtn.click();
    }

    async goToManageBookings(){
        await this.manageBookingsBtn.click();
    }

}