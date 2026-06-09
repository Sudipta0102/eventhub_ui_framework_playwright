import { Page, Route } from "@playwright/test";

/**
 * route.fulfill(): Fakes the Response data coming back to the UI.
 * route.continue(): Modifies the outgoing Request data going to the server.
 * route.fetch(): Downloads the authentic Response data directly from the server.
 * route.abort(): NoDrops the network connection completely (simulates offline).
 */
export class NetworkInterceptor{

    private readonly page:Page;

    constructor(page: Page){
        this.page = page;
    }

    /**
     * Intercepts any network and fulfills it with mocked payload and status code
     * 
     * @param crudMethod - HTTP Verb 'GET' | 'POST' | 'PUT' | 'DELETE'
     * @param urlPattern - Relative endpoint path or regex pattern to match
     * @param mockPayload 
     * @param statusCode - this is optional, 200 is default
     * 
     */
    async mockResponsePayload(
        crudMethod : 'GET' | 'POST' | 'PUT' | 'DELETE',
        urlPattern : string | RegExp,
        mockPayload : object,
        statusCode = 200 
    ): Promise<void>{

        await this.page.route(urlPattern, async (route: Route) =>{

            // fulfill() never reaches the real server. It intercepts the
            // outgoing request inside the browser and immediately 
            // feeds the fake response that is sent by this method.
            // check if the ongoing request matches the request here.
            if(route.request().method() === crudMethod) {
                await route.fulfill({
                    status: statusCode,
                    contentType: 'application/json',
                    json: mockPayload, 
                });
            }else{
                await route.continue();
            }
        })
    }

    /**
     * Modifies the request payload before it hits the server.
     * Retains Original headers like token, content-type automatically.
     * 
     * @param urlPattern - Relative endpoint path or regex pattern to match
     * @param requestPayload
     * 
     */
    async mockRequestPayload(
        urlPattern : string | RegExp,
        requestPayload : object): Promise<void>{

        await this.page.route(urlPattern, async (route)=>{
            await route.continue({
                postData: JSON.stringify(requestPayload),
            });
        });    

    }

   
    /**
     * The request hits the real server normally using route.fetch(). 
     * Then, on its way back, Playwright intercepts the authentic response, 
     * allows you to edit the JSON body, and passes the modified data to the 
     * UI using route.fulfill().
     * 
     * @param urlPattern - Relative endpoint path or regex pattern to match
     * @param propertyTobeModifiedFn - Callback function that receives the live JSON body object, 
     * allowing you to manipulate complex nested structures natively using standard JavaScript 
     * array brackets and dot-notation.
     * 
     * @example
     * 
     * await networkMock.modifyRealResponse("\*\*\/api/events", (json) => {
     *     json.data.author.books[0].vol = "Volume 5";
     * });
     * 
     */
    async modifyRealResponseProperty(
        urlPattern : string | RegExp,
        propertyTobeModifiedFn: (json: any) => void) : Promise<void>{

        await this.page.route(urlPattern, async (route)=>{
            // 1. fetch the actual response first
            const response = await route.fetch();
            const responseJson = await response.json();

            // 2. inject the modified using callback
            propertyTobeModifiedFn(responseJson);

            // 3. serve the modfied payload back to the UI
            await route.fulfill({
                response: response,
                json: responseJson,
            });
        });    
    }

    /**
     * blocks the outgoing network
     * @param urlPattern - Relative endpoint path or regex pattern to match
     */
    async abortRequests(
        urlPattern:string | RegExp): Promise<void> {
        
        await this.page.route(urlPattern, async (route)=>{
            await route.abort();
        });    

    }


}

