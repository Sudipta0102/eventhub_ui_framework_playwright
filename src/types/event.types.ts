export interface EventData{
    title: string;
    description?: string;
    category: 'Conference' | 'Concert' | 'Sports' | 'Workshop' | 'Festival';
    city: string;
    venue: string;
    eventDate: string;
    price: string | number;
    totalSeats: string | number;
    imageUrl?: string;
}