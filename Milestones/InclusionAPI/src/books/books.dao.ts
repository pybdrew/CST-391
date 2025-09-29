import { execute } from '../services/mysql.connector';
import { Book } from './books.model';
import { Translation } from '../translations/translations.models';
import * as queries from './books.queries';

export class BooksDAO {
  async getAllBooksForDropdown(): Promise<Book[]> {
    return execute<Book[]>(queries.GET_ALL_BOOKS_FOR_DROPDOWN, []);
  }

  async getAllTranslations(): Promise<Translation[]> {
    return execute<Translation[]>(`
      SELECT translation, title, license
      FROM translations
      ORDER BY title
    `, []);
  }
}
