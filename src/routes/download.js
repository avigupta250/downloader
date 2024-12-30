import { Router } from 'express';
import { validateUrl } from '../middleware/validateUrl.js';
import { downloadController } from '../controllers/downloadController.js';

const router = Router();

router.post('/download', validateUrl, downloadController);

export { router as downloadRouter };