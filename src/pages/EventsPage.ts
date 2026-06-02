import {type Page, type Locator} from '@playwright/test';

export class EventsPage{
    private readonly page: Page;
    private readonly events: Locator;

    constructor(page: Page){
        this.page = page;
        this.events = page.getByTestId('event-card');
    }

    async bookEventByName(eventName : string){

        // isolating the target card
        const targetCard = this.events
        .filter({has: this.page.locator('h3', {hasText: eventName})
        });

        // locating the specific book now button inside target card
        const bookNowBtn = targetCard.getByTestId('book-now-btn');

        // explicitly wait for the button to be visible in DOM
        await bookNowBtn.waitFor({state: 'visible', timeout: 5000});

        // click() will auto wait
        await bookNowBtn.click();
    }
}