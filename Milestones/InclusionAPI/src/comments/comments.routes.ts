import { Router } from 'express';
import * as commentsController from './comments.controller';

const router = Router();

// route for GET all comments
router
    .route('/comments')
    .get(commentsController.getAllComments);

// route for GET a single comment by ID
router
    .route('/comments/:id')
    .get(commentsController.getCommentById);

// route for POST create a new comment
router
    .route('/comments')
    .post(commentsController.createComment);

// route for PUT update an existing comment
router
    .route('/comments/:id')
    .put(commentsController.updateComment);

// route for DELete a comment
router
    .route('/comments/:id')
    .delete(commentsController.deleteComment);

export default router;
