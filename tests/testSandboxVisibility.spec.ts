import { only } from "node:test";
import { test, expect } from "../src/fixtures";
import SIX_EVENTS_RESPONSE from '../test-data/six-events.json';
import FOUR_EVENTS_RESPONSE from '../test-data/four-events.json';

test.describe('Sandbox Banner Threshold Validations', ()=>{

    const endpoint = '**/api/events**';

    test('Banner IS visible when 6 events are returned', async ({ pomWithAPIAuthenticatedPage, apiAuthenticatedPage, networkMock })=>{
        
        //const targetUrl = `${process.env.BASE_API_URL}/events**`; // this also works
        // mock the response payload
        await networkMock.mockResponsePayload('GET', endpoint, SIX_EVENTS_RESPONSE);

        // login and go to events
        await pomWithAPIAuthenticatedPage.headerPage.goToEvents();
        // await apiAuthenticatedPage.reload();
        // await apiAuthenticatedPage.waitForLoadState('networkidle');

        // verify the event card number
        const allEvents = pomWithAPIAuthenticatedPage.eventsPage.getAllEvents();
        await expect(allEvents.first()).toBeVisible();
        await expect(allEvents).toHaveCount(6);

        // verify the sandbopx
        const sandbopxBanner = apiAuthenticatedPage.getByText(/sandbox holds up to/i);
        await expect(sandbopxBanner).toBeVisible();
        await expect(sandbopxBanner).toContainText('9 bookings');
    })

    test('Banner is NOT visible when 4 events are returned', async ({ apiAuthenticatedPage, pomWithAPIAuthenticatedPage, networkMock })=>{

        await networkMock.mockResponsePayload('GET', endpoint, FOUR_EVENTS_RESPONSE );

        await pomWithAPIAuthenticatedPage.headerPage.goToEvents();

        const allEvents = pomWithAPIAuthenticatedPage.eventsPage.getAllEvents();
        await expect(allEvents.first()).toBeVisible();
        await expect(allEvents).toHaveCount(4);

        const sandbopxBanner = apiAuthenticatedPage.getByText(/sandbox holds up to/i);
        await expect(sandbopxBanner).not.toBeVisible();

    })

})