import { Request, Response } from 'express';
import * as commentsDAO from './comments.dao';

// GET all comments
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentsDAO.getAllComments();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// GET a single comment by ID
export const getCommentById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const comment = await commentsDAO.getCommentById(id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comment' });
  }
};

// PUT Update an existing comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { commentText, translation } = req.body;
    const updatedComment = await commentsDAO.updateComment({ id, commentText, translation } as any);
    if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

// DELete a comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await commentsDAO.deleteComment(id);
    if (!deleted) return res.status(404).json({ message: 'Comment not found' });
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
