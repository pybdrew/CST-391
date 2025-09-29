import { Request, Response } from 'express';
import { VersesDAO } from './verses.dao';

const versesDao = new VersesDAO();

// Existing: fetch verses by book & chapter (optionally translation)
export async function getVersesByBookChapter(req: Request, res: Response): Promise<void> {
  const bookId = Number(req.query.bookId);
  const chapter = Number(req.query.chapter);
  const translation = req.query.translation as string | undefined;

  if (isNaN(bookId) || isNaN(chapter)) {
    res.status(400).json({ error: 'Invalid bookId or chapter' });
    return;
  }

  try {
    let verses;
    if (translation) {
      verses = await versesDao.getVersesByBookChapterAndTranslation(bookId, chapter, translation);
    } else {
      verses = await versesDao.getVersesByBookChapter(bookId, chapter);
    }
    res.status(200).json(verses);
  } catch (err) {
    console.error('[VersesController][getVersesByBookChapter]', err);
    res.status(500).json({ error: 'Failed to fetch verses' });
  }
}

export async function getVerseById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid verse ID' });
    return;
  }

  try {
    const verse = await versesDao.getVerseById(id);
    if (!verse) {
      res.status(404).json({ error: 'Verse not found' });
      return;
    }
    res.status(200).json(verse);
  } catch (err) {
    console.error('[VersesController][getVerseById]', err);
    res.status(500).json({ error: 'Failed to fetch verse' });
  }
}


// New: fetch all verses for a given translation
export async function getVersesByTranslation(req: Request, res: Response): Promise<void> {
  const translation = req.query.translation as string;

  if (!translation) {
    res.status(400).json({ error: 'Translation is required' });
    return;
  }

  try {
    const verses = await versesDao.getVersesByTranslation(translation);
    res.status(200).json(verses);
  } catch (err) {
    console.error('[VersesController][getVersesByTranslation]', err);
    res.status(500).json({ error: 'Failed to fetch verses' });
  }
}
