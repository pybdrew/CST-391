export const GET_VERSES_BY_BOOK_CHAPTER = `
  SELECT id, translation, book_id, chapter, verse AS verseNumber, text
  FROM verses
  WHERE book_id = ? AND chapter = ?
  ORDER BY verse
`;

export const GET_VERSES_BY_BOOK_CHAPTER_TRANSLATION = `
  SELECT id, translation, book_id, chapter, verse AS verseNumber, text
  FROM verses
  WHERE book_id = ? AND chapter = ? AND translation = ?
  ORDER BY verse
`;

export const GET_VERSE_BY_ID = `
  SELECT id, translation, book_id, chapter, verse AS verseNumber, text
  FROM verses
  WHERE id = ?
`;

export const GET_VERSES_BY_TRANSLATION = `
  SELECT id, translation, book_id, chapter, verse AS verseNumber, text
  FROM verses
  WHERE translation = ?
  ORDER BY book_id, chapter, verse
`;

