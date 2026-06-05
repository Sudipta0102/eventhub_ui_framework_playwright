import { faker, fakerEN_IN } from '@faker-js/faker';
import { type EventData } from '../src/types/event.types';

export class EventFactory{


    static createEventsWithOptionalFields(): EventData {

        return {

            title: `${faker.company.buzzAdjective()} ${faker.word.noun()} Festival`,
            description: faker.lorem.paragraph({min: 1, max: 2}),
            category: 'Festival',
            city: fakerEN_IN.location.city(), // it will produce cities within india only
            venue: `${faker.company.name()} Auditorium`,
            dateTime: faker.date.future().toISOString().substring(0, 16),
            price: faker.number.int({min: 100, max: 1000}),
            seats: faker.number.int({min: 1, max: 50}),
            imageUrl: faker.image.urlPicsumPhotos()
        };
    }

    static createEventsWithoutOptionalFields(): EventData {
    
        return{
            title: `${faker.company.catchPhraseAdjective()} Conference`,
            category: 'Conference',
            city: fakerEN_IN.location.city(),
            venue: `${faker.company.name()} Very Large Conevetion Center`,
            dateTime: faker.date.future().toISOString().substring(0, 16),
            price: faker.number.int({ min: 0, max : 2000 }),
            seats: faker.number.int({ min: 10, max: 50 })
        };
    }    
}