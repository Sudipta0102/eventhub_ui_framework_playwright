import { type Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { CreateEventPage } from './CreateEventPage';
import { EventsPage } from './EventsPage';
import { HeaderPage } from './HeaderPage';
import { BookNowPage } from './BookNowPage';
import { ManageBookingPage } from './ManageBookingPage';
import { DashboardPage } from './DashboardPage';

export class PageObjectManager {

    // 1. declare the private vars
    private readonly page: Page;
    private _loginPage?: LoginPage;
    private _createEvenetPage?: CreateEventPage;
    private _eventsPage?: EventsPage;
    private _headerPage?: HeaderPage;
    private _bookNowPage?: BookNowPage;
    private _manageBookingPage?: ManageBookingPage;
    //private _dashBoardPage: DashboardPage | undefined;
    private _dashboardPage ?: DashboardPage;

    // 2. accepting the active browser tab context from fixture layer
    constructor(page:Page){
        this.page = page;
    }

    // 3. Lazy Getters: instantiates the Page Object only when a test
    // explicitly reads it in test file.
    get loginPage(): LoginPage{
        if(!this._loginPage){
           this._loginPage = new LoginPage(this.page);
        }
        return this._loginPage;
    }

    get createEventPage(): CreateEventPage{
        if(!this._createEvenetPage){
            this._createEvenetPage = new CreateEventPage(this.page);
        }
        return this._createEvenetPage;
    }

    get eventsPage(): EventsPage{
        if(!this._eventsPage){
            this._eventsPage = new EventsPage(this.page);
        }
        return this._eventsPage;
    }

    get headerPage(): HeaderPage{
        if(!this._headerPage){
            this._headerPage = new HeaderPage(this.page); 
        }
        return this._headerPage;
    }

    get bookNowPage(): BookNowPage{
        if(!this._bookNowPage){
            this._bookNowPage = new BookNowPage(this.page);
        }
        return this._bookNowPage;
    }

    get manageBookingPage(): ManageBookingPage{
        if(!this._manageBookingPage){
            this._manageBookingPage = new ManageBookingPage(this.page);
        }
        return this._manageBookingPage;
    }

    get dashboardPage(): DashboardPage{
        if(!this._dashboardPage){
            this._dashboardPage = new DashboardPage(this.page);
        }
        return this._dashboardPage;
    }
}