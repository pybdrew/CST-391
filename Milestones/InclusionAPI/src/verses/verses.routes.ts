import { Router } from 'express';
import * as versesController from './verses.controller';

const router = Router();

// GET /verses/all?translation=KJV
router.get('/all', versesController.getVersesByTranslation);

// GET /verses?bookId=1&chapter=1&translation=...
router.get('/', versesController.getVersesByBookChapter);

// GET /verses/:id
router.get('/:id', versesController.getVerseById);

export default router;
