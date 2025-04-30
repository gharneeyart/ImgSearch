import { Router } from 'express';
import { ImageController } from '../controllers/imageController';

const router = Router();
const imageController = new ImageController();

export function setImageRoutes(app: Router) {
    app.get('/api/images/search', imageController.searchImages.bind(imageController));
}

export default router;