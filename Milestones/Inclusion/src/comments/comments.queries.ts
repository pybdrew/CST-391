// simple queries for minimal API
export const commentQueries = {
  readComments: `
    SELECT * 
    FROM VerseComments
  `,
  
  readCommentById: `
    SELECT * 
    FROM VerseComments 
    WHERE id = ?
  `,
  createComment: `
  INSERT INTO VerseComments (verse_id, comment_text, translation)
  VALUES (?, ?, ?)
`,
  updateComment: `
    UPDATE VerseComments 
    SET comment_text = ?, translation = ? 
    WHERE id = ?
  `,
  deleteComment: `
    DELETE FROM VerseComments 
    WHERE id = ?
  `,
};
