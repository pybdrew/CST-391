import { Router } from 'express';
import * as commentsController from './comments.controller';

const router = Router();

// route for GET all comments
router.get('/comments', commentsController.getAllComments);

// route for GET a single comment by ID
router.get('/comments/:id', commentsController.getCommentById);

// route for PUT update an existing comment
router.put('/comments/:id', commentsController.updateComment);

// route for DELete a comment
router.delete('/comments/:id', commentsController.deleteComment);

export default router;
