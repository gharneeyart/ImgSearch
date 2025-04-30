import axios from 'axios';
import { Image, SearchQuery } from '../types';
import dotenv from 'dotenv';
dotenv.config();

export class ImageService {
    private apiKey: string;
    private apiUrl: string;

    constructor() {
        this.apiKey = process.env.IMAGE_API_KEY || '';
        this.apiUrl = 'https://api.unsplash.com/search/photos';
    }

    public async fetchImages(query: SearchQuery): Promise<Image[]> {
        try {
            const response = await axios.get(this.apiUrl, {
                params: {
                    client_id: this.apiKey, // Unsplash API requires `client_id` for authentication
                    query: query.query,
                    page: query.page,
                    per_page: query.perPage,
                },
            });
            console.log(response.data.results);
            // Map the API response to the `Image` type
            return response.data.results.map((image: any) => ({
                id: image.id,
                title: image.alt_description || 'No title',
                url: image.urls.small,
                description: image.description || '',
                tags: image.tags?.map((tag: any) => tag.title) || [],
            }));
            
        } catch (error) {
            console.error('Error fetching images:', error);
            throw new Error('Failed to fetch images from Unsplash API');
        }
    }
    
}
