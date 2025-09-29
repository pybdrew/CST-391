import { execute } from '../services/mysql.connector';
import { Verse } from './verses.model';
import * as queries from './verses.queries';

export class VersesDAO {
  async getVersesByBookChapter(bookId: number, chapter: number): Promise<Verse[]> {
    return execute<Verse[]>(queries.GET_VERSES_BY_BOOK_CHAPTER, [bookId, chapter]);
  }

  async getVersesByBookChapterAndTranslation(bookId: number, chapter: number, translation: string): Promise<Verse[]> {
    return execute<Verse[]>(queries.GET_VERSES_BY_BOOK_CHAPTER_TRANSLATION, [bookId, chapter, translation]);
  }

  async getVerseById(id: number): Promise<Verse | null> {
    const verses = await execute<Verse[]>(queries.GET_VERSE_BY_ID, [id]);
    return verses.length > 0 ? verses[0] : null;
  }

  async getVersesByTranslation(translation: string): Promise<Verse[]> {
    return execute<Verse[]>(queries.GET_VERSES_BY_TRANSLATION, [translation]);
  }

}
