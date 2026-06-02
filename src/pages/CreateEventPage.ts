import { type Page, type Locator } from "@playwright/test";
import { type EventData } from '../types/event.types';

export class CreateEventPage{
    private readonly page: Page;
    private readonly newEventHeading: Locator;
    private readonly title: Locator;
    private readonly description: Locator;
    private readonly category: Locator;
    private readonly city: Locator;
    private readonly venue: Locator;
    private readonly dateTime: Locator;
    private readonly price: Locator;
    private readonly seats: Locator;
    private readonly imageUrl: Locator;
    private readonly addEventBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.newEventHeading = page.locator('h2', {hasText: 'New Event'});
        this.title = page.getByTestId('event-title-input');
        this.description = page.getByPlaceholder('Describe the event…');
        this.category = page.locator('#category');
        this.city = page.locator('#city');
        this.venue = page.locator('#venue');
        this.dateTime = page.getByLabel('Event Date & Time*');
        this.price = page.getByLabel('Price ($)');
        this.seats = page.locator('#total-seats');
        this.imageUrl = page.locator("input[id='image-url-(optional)']");
        this.addEventBtn = page.getByRole('button', { name: '+ Add Event' });
    }

    async createEvent(event: EventData): Promise<void>{

        await this.newEventHeading.waitFor({ state: 'visible' });

        if(event.description){
            await this.description.fill(event.description);
        }

        await this.category.selectOption(event.category);

        await this.city.fill(event.city);
        await this.venue.fill(event.venue);

        await this.dateTime.fill(event.dateTime);
        await this.price.fill(event.price.toString());
        await this.seats.fill(event.seats.toString());

        if(event.imageUrl){
            await this.imageUrl.fill(event.imageUrl);
        }

        await this.addEventBtn.click();
        
    }
}