import { faker, fakerEN_IN } from '@faker-js/faker';
import { type EventData } from '../src/types/event.types';
import { formatEventDateTime } from '../src/utils/DateUtils';

export class EventFactory{


    static createEventsWithOptionalFields(): EventData {

        return {

            title: `${faker.company.buzzAdjective()} ${faker.word.noun()} Festival`,
            description: faker.lorem.paragraph({min: 1, max: 2}),
            category: 'Festival',
            city: fakerEN_IN.location.city(), // it will produce cities within india only
            venue: `${faker.company.name()} Auditorium`,
            eventDate: faker.date.future().toISOString(),
            price: faker.number.int({min: 100, max: 1000}),
            totalSeats: faker.number.int({min: 20, max: 500}),
            imageUrl: faker.image.urlPicsumPhotos(),
        };
    }

    static createEventsWithoutOptionalFields(): EventData {
    
        return{
            title: `${faker.company.catchPhraseAdjective()} Conference`,
            category: 'Conference',
            city: fakerEN_IN.location.city(),
            venue: `${faker.company.name()} Very Large Conevetion Center`,
            eventDate: faker.date.future().toISOString(),
            price: faker.number.int({ min: 0, max : 2000 }),
            totalSeats: faker.number.int({ min: 10, max: 500 })
        };
    }  
    
    static createEventWithExplicitDate(): EventData{
        return{
            title: `${faker.company.catchPhraseAdjective()} Conference`,
            category: 'Conference',
            city: fakerEN_IN.location.city(),
            venue: `${faker.company.name()} Very Large Conevetion Center`,
            eventDate: formatEventDateTime(11, 6, 2027, "9:32PM"),
            price: faker.number.int({ min: 0, max : 2000 }),
            totalSeats: faker.number.int({ min: 10, max: 500 })
        };
    }
}