import { Request, Response } from 'express';
import { ImageController } from '../controllers/imageController';
import { ImageService } from '../services/imageService';

jest.mock('../services/imageService'); // Mock the ImageService

describe('ImageController', () => {
    let controller: ImageController;
    let mockImageService: jest.Mocked<ImageService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockImageService = new ImageService() as jest.Mocked<ImageService>;
        controller = new ImageController();
        (controller as any).imageService = mockImageService; // Replace the service with the mocked one

        mockRequest = {
            query: {},
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return images for a valid search query', async () => {
        // Arrange
        mockRequest.query = { q: 'cat', page: '1', perPage: '10' };
        const mockImages = [
            { id: '1', title: 'Cat', url: 'http://example.com/cat.jpg', description: 'A cute cat', tags: ['cat'] },
        ];
        mockImageService.fetchImages.mockResolvedValue(mockImages);

        // Act
        await controller.searchImages(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockImages);
    });

    it('should return a 500 error if the service throws an error', async () => {
        // Arrange
        mockRequest.query = { q: 'cat', page: '1', perPage: '10' };
        mockImageService.fetchImages.mockRejectedValue(new Error('Service error'));

        // Act
        await controller.searchImages(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Error fetching images',
            error: 'Service error',
        });
    });

    it('should return a 500 error for an invalid search query', async () => {
        // Arrange
        mockRequest.query = { q: '' }; // Invalid query

        // Act
        await controller.searchImages(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Error fetching images',
            error: 'Invalid search query',
        });
    });
});