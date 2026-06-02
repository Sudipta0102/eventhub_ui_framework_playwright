export interface EventData{
    title: string;
    description?: string;
    category: 'Conference' | 'Concert' | 'Sports' | 'Workshop' | 'Festival';
    city: string;
    venue: string;
    dateTime: string;
    price: string | number;
    seats: string | number;
    imageUrl?: string;
}