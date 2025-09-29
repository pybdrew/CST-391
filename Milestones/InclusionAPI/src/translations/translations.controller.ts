import { Request, Response } from 'express';
import { execute } from '../services/mysql.connector';

export async function getAllTranslations(req: Request, res: Response): Promise<void> {
  try {
    const translations = await execute(
      `SELECT translation, title FROM translations ORDER BY title`,
      []
    );
    res.status(200).json(translations);
  } catch (err) {
    console.error('[TranslationsController][getAllTranslations]', err);
    res.status(500).json({ error: 'Failed to fetch translations' });
  }
}
