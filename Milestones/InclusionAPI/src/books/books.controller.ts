import { Request, Response } from 'express';
import { BooksDAO } from './books.dao';

const booksDao = new BooksDAO();

export async function getBooksDropdown(req: Request, res: Response): Promise<void> {
  try {
    const books = await booksDao.getAllBooksForDropdown();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch books for dropdown' });
  }
}
