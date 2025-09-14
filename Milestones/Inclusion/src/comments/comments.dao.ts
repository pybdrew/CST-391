import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Comment } from './comments.model';
import { commentQueries } from './comments.queries';

// fetch all comments from the database
export const getAllComments = async () => {
  return execute<Comment[]>(commentQueries.readComments, []);
};

// fetch a single comment by its id
export const getCommentById = async (id: number) => {
  const results = await execute<Comment[]>(commentQueries.readCommentById, [id]);
  return results.length > 0 ? results[0] : undefined;
};
// update an existing comment (text + translation) by id
export const updateComment = async (comment: Comment) => {
  return execute<OkPacket>(
    commentQueries.updateComment,
    [comment.commentText, comment.translation, comment.id]
  );
};

// delete a comment by id
export const deleteComment = async (id: number) => {
  return execute<OkPacket>(commentQueries.deleteComment, [id]);
};
