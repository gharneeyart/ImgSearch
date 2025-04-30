import { Request, Response } from 'express';
import { ImageService } from '../services/imageService';
import { SearchQuery } from '../types';

export class ImageController {
    private imageService: ImageService;

    constructor() {
        this.imageService = new ImageService();
    }

    public async searchImages(req: Request, res: Response): Promise<void> {
        const query = req.query.q as string;
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1; // Default to page 1
        const perPage = req.query.perPage ? parseInt(req.query.perPage as string, 10) : 9; // Default to 9 images per page

        try {
            // Validate the query
            const searchQuery: SearchQuery = this.validateSearchQuery(query, page, perPage);

            // Delegate fetching logic to the service
            const images = await this.imageService.fetchImages(searchQuery);

            // Send the images as a JSON response
            res.status(200).json(images);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error fetching images', error: error.message });
            } else {
                res.status(500).json({ message: 'Unknown error occurred' });
            }
        }
    }

    private validateSearchQuery(query: string, page?: number, perPage?: number): SearchQuery {
        if (!query || query.trim() === '') {
            throw new Error('Invalid search query');
        }

        return {
            query: query.trim(),
            page,
            perPage,
        };
    }
}