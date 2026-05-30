export class LoginPage { 
    constructor(private page: any) {} 

    async navigate() { 
        await this.page.goto('/login'); 
    } 
}
