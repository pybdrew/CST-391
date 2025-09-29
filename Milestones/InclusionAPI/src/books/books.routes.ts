import { Router } from 'express';
import * as booksController from './books.controller';

const router = Router();

// GET /books → returns all books for dropdown
router
    .route('/')
    .get(booksController.getBooksDropdown);

export default router;
