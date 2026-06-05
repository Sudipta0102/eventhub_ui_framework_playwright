// import { test, expect } from '../src/fixtures/auth.fixture';
// import { loginAsUser } from '../src/utils/APILogin';
// import { HeaderPage } from '../src/pages/HeaderPage';
// import { EventsPage } from '../src/pages/EventsPage';
// import { DashboardPage } from '../src/pages/DashboardPage';
// import { CreateEventPage } from '../src/pages/CreateEventPage';
import { test, expect } from '../src/fixtures';
import { EventData } from '../src/types/event.types';

test.describe('Create Event Test', ()=>{

    test('should login', async({ apiAuthenticatedPage, pomWithAPIAuthenticatedPage }) =>{

        await apiAuthenticatedPage.goto("/events");
        //const eventsPage = new EventsPage(apiAuthenticatedPage);
        await expect(pomWithAPIAuthenticatedPage.eventsPage.getHeadingOfFirstEvent()).toBeVisible();


    })

    test('should login with ui', async({ uiAuthenticatedPage, pomWithUIAuthenticatedPage })=>{

        await uiAuthenticatedPage.goto("/events");
        //const eventsPage = new EventsPage(uiAuthenticatedPage);
        await expect(pomWithUIAuthenticatedPage.eventsPage.getHeadingOfFirstEvent()).toBeVisible();
    })

    test('should create event with optional fields', async({ pomWithAPIAuthenticatedPage })=>{


        // Navigating to new event page
        //const headerPage = new HeaderPage(apiAuthenticatedPage);
        await pomWithAPIAuthenticatedPage.headerPage.goToAdmin();
        await pomWithAPIAuthenticatedPage.headerPage.createNewEvent();
        //const createEventPage = new CreateEventPage(apiAuthenticatedPage);

        // Defining test data using the EventData structure
        const mockEvent: EventData = {
            title: 'Dilli Diwali Mela',
            description: 'A grand celebration of lights, food, and culture.',
            category: 'Festival',
            city: 'Delhi',
            venue: 'Pragati Maidan Exhibition Grounds',
            dateTime: '2026-10-20T18:30', // HTML5 local datetime string format
            price: 300,
            seats: 2,
            imageUrl: 'https://unsplash.com'
        };

        await pomWithAPIAuthenticatedPage.createEventPage.createEvent(mockEvent);
        //await apiAuthenticatedPage.pause();
        await expect(pomWithAPIAuthenticatedPage.createEventPage.getToastNotification()).toBeVisible();
        // apiAuthenticatedPage.pause();

        // await apiAuthenticatedPage.waitForTimeout(100000);

    })

    test('should create an event without optional fields', async({ pomWithAPIAuthenticatedPage })=>{

        // Navigating to new event page
        //const headerPage = new HeaderPage(apiAuthenticatedPage);
        pomWithAPIAuthenticatedPage.headerPage.goToAdmin();
        pomWithAPIAuthenticatedPage.headerPage.createNewEvent();
        //const createEventPage = new CreateEventPage(apiAuthenticatedPage);

        // description and imageUrl are missing here
        const minimalEvent: EventData = {
            title: 'Tech Conference 2026',
            category: 'Conference',
            city: 'Bangalore',
            venue: 'BIEC Hall 1',
            dateTime: '2026-11-05T09:00',
            price: 0, // Free event passed cleanly as a number
            seats: 10
        };

        await pomWithAPIAuthenticatedPage.createEventPage.createEvent(minimalEvent);
        await expect(pomWithAPIAuthenticatedPage.createEventPage.getToastNotification()).toBeVisible();
    })
});