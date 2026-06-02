import { type Page, type Locator } from "@playwright/test";

export class DashboardPage{

    private readonly page : Page;
    private readonly featuredEventsHeading : Locator;
    private readonly browseEventsLink : Locator;
    private readonly myBookingsButton : Locator;
    private readonly events : Locator;

    constructor(page: Page){

        this.page = page;
        this.featuredEventsHeading = page.getByRole('heading', { name: 'Featured Events', level: 2 });
        this.browseEventsLink = page.getByRole('link', { name: 'Browse Events' });
        this.myBookingsButton = page.getByRole('button', { name: 'My Bookings' });
        this.events = page.getByTestId('event-card');
    }

    getFeaturedEventsHeading(){

        return this.featuredEventsHeading;

    }

    getbrowseEventsLink(){
        return this.browseEventsLink;
    }

}