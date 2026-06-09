// import { test, expect } from '../src/fixtures/auth.fixture';
// import { loginAsUser } from '../src/utils/APILogin';
// import { HeaderPage } from '../src/pages/HeaderPage';
// import { EventsPage } from '../src/pages/EventsPage';
// import { DashboardPage } from '../src/pages/DashboardPage';
// import { CreateEventPage } from '../src/pages/CreateEventPage';
// import { EventData } from '../src/types/event.types';
import { test, expect } from '../src/fixtures';
import { EventData } from '../src/types/event.types';
import { EventFactory } from '../test-data/event.factory';

test.describe.skip('Create Event Test', ()=>{

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
        const mockEvent = EventFactory.createEventsWithOptionalFields();

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
        const minimalEvent = EventFactory.createEventsWithoutOptionalFields();

        await pomWithAPIAuthenticatedPage.createEventPage.createEvent(minimalEvent);
        await expect(pomWithAPIAuthenticatedPage.createEventPage.getToastNotification()).toBeVisible();
    })
});
test.describe('event lifecycle', () => {
    test.describe.configure({mode: 'serial'});

    let targetEventId: number;
    let mockEvent : EventData;

    test('event creation', async ({ apiAuthenticatedPage, pomWithAPIAuthenticatedPage, apiClient }) => {

        await pomWithAPIAuthenticatedPage.headerPage.goToEvents();
        //await apiAuthenticatedPage.goto('/events'); 

        await apiAuthenticatedPage.waitForLoadState('networkidle');

        //create mock event
        mockEvent = EventFactory.createEventsWithOptionalFields();

        // create the event using the POST method
        const createEvent = await apiClient.post(`${process.env.BASE_API_URL}/events`, mockEvent);
        targetEventId = createEvent.data.id;

        // go to events page
        //await pomWithAPIAuthenticatedPage.headerPage.goToEvents();
        await apiAuthenticatedPage.reload();
        await apiAuthenticatedPage.waitForLoadState('networkidle');

        // get the target events from the event card 
        const newEvent = pomWithAPIAuthenticatedPage.eventsPage
            .getAllEvents()
            .filter({ has: apiAuthenticatedPage.locator('h3', { hasText: createEvent.data.title }) });

        // const newEvent = pomWithAPIAuthenticatedPage.eventsPage
        // .getAllEvents()
        // .filter({ hasText: createEvent.data.title });


        await expect(newEvent).toBeVisible();
    })

    test('event fetch', async({apiAuthenticatedPage, pomWithAPIAuthenticatedPage, apiClient})=>{

        await pomWithAPIAuthenticatedPage.headerPage.goToEvents();
        await apiAuthenticatedPage.waitForLoadState('networkidle');

        const getAllEvents = await apiClient.get(`${process.env.BASE_API_URL}/events`);

        const eventCount = getAllEvents.data.length;
        console.log('Events Returned by API call: ', eventCount);

        const uiEvents = pomWithAPIAuthenticatedPage.eventsPage.getAllEvents();

        await expect(uiEvents).toHaveCount(eventCount);

    })

    test('fetch filtered event', async({pomWithAPIAuthenticatedPage, apiAuthenticatedPage, apiClient})=>{

        await pomWithAPIAuthenticatedPage.headerPage.goToEvents();
        await apiAuthenticatedPage.waitForLoadState('networkidle');

        const getFilteredEvents = await apiClient.get(`${process.env.BASE_API_URL}/events`, {
            params: {
                category: 'Festival',                
            },
        });

        
        console.log('Fetching filtered event: ', JSON.stringify(getFilteredEvents, null, 2));


    })

    test('fetch a single event with id', async({ apiAuthenticatedPage, pomWithAPIAuthenticatedPage, apiClient })=>{

        await pomWithAPIAuthenticatedPage.headerPage.goToEvents();
        await apiAuthenticatedPage.waitForLoadState('networkidle');

        const getEventById = await apiClient.get(`${process.env.BASE_API_URL}/events/${targetEventId}`);

        console.log('Fetching event by id: ', JSON.stringify(getEventById, null, 2));

    })

    test('edit event', async({apiAuthenticatedPage, pomWithAPIAuthenticatedPage, apiClient})=>{

        await pomWithAPIAuthenticatedPage.headerPage.goToEvents();
        await apiAuthenticatedPage.waitForLoadState('networkidle');

        const updatedSeats = 125;
        const updatedCity = 'Delhi';

        const editedEventResponse = await apiClient.put(`${process.env.BASE_API_URL}/events/${targetEventId}`, {
            ...mockEvent,
            city: updatedCity,
            totalSeats: updatedSeats,
        });

        console.log('Fetching event by id: ', JSON.stringify(editedEventResponse, null, 2));
        expect(editedEventResponse.success).toBe(true);
    })

    test('delete event', async({apiAuthenticatedPage, pomWithAPIAuthenticatedPage, apiClient})=>{

        await pomWithAPIAuthenticatedPage.headerPage.goToEvents();
        await apiAuthenticatedPage.waitForLoadState('networkidle');

        const deleteResponse = await apiClient.delete(`${process.env.BASE_API_URL}/events/${targetEventId}`);

        console.log('Fetching event by id: ', JSON.stringify(deleteResponse, null, 2));
        expect(deleteResponse.success).toBe(true);
    })
});