import { Router } from 'express';
import * as translationsController from './translations.controller';

const router = Router();

// GET /translations → returns all translations
router.route('/').get(translationsController.getAllTranslations);

export default router;
