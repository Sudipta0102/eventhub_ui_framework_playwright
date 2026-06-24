import { Page } from "@playwright/test";

export class TabManager{

    constructor(private readonly page: Page){

    }

    /**
     * Waits for newly opened tab
     * 
     * @example :
     * const tabManager = new TabManager(page);
     * const newTab = await tabManager.waitForNewTab(
     *  async () => {
     *      await page.getByRole('someLink', name: some name).click();
     *  }
     * );
     * 
     * @param triggerAction: () => Promise<void> - Give it some action that will cause a new tab to open
     */
    async waitForNewTab(
        triggerAction: ()=> Promise<void>
    ): Promise<Page>{

        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            triggerAction()
        ]);

        return newPage;
    }

    /**
     * Swithces to tab by index
     */
    async switchToTabByIndex(index : number): Promise<Page>{

        const pages = this.page.context().pages();

        if(index < 0 || index >= pages.length){
            throw new Error(`Index: ${index} is invalid`);
        }

        return pages[index];

    }

    /**
     * 
     * @param partialUrl 
     * @returns matching page instance
     * @throws error when no matching instance found
     * @example 
     * const tabManager = new TabManager(page);
     * const githubPage = await tabManager.switchToTabByUrl('github'); 
     */
    async switchToTabByUrl(partialUrl:string): Promise<Page>{

        const pages = this.page.context().pages();

        const targetPage = pages.find(
            page => page.url().includes(partialUrl)
        );

        if(!targetPage){
            throw new Error( `No tab found containing URL: ${partialUrl}`);
        }

        await targetPage.bringToFront();

        return targetPage;
    }

    /**
     * 
     * @param partialTitle 
     * @returns matching page instance
     * @throws error when no matching instance found
     * @example 
     * const tabManager = new TabManager(page);
     * const githubPage = await tabManager.switchToTabByTitle('github'); 
     */
    async switchToTabByTitle(partialTitle: string): Promise<Page>{

        const pages = this.page.context().pages();

        for (const page of pages) {

            const title = await page.title();

            if (title.includes(partialTitle)) {

                await page.bringToFront();

                return page;
            }
        }

        throw new Error(`page with Title: ${partialTitle} not found`);
    }

    /**
     * @returns all pages. 
     */
    getAllTabs(): Page[]{

        const pages = this.page.context().pages();

        return pages;
    }

    /**
     * closes current tab
     */
    async closeCurrentTab(): Promise<void>{

        await this.page.close();

    }

    /**
     * closes all the tabs except current tab
     */
    async closeAllSecondaryTabs(): Promise<void>{

        const pages = this.page.context().pages();

        for(const p of pages){
            if(p !== this.page){
                await p.close();
            }
        }

    }

    /**
     * 
     * @returns true if only one tab is open, otherwise returns false.
     */
    hasSingleTab(): boolean{

        const pages = this.page.context().pages();
        
        return pages.length === 1;

    }

}