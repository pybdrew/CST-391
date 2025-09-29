export interface Book {
  id: number;
  translation: string;
  name: string;
  testament: 'OT' | 'NT';
}

export interface Translation {
  translation: string;
  title: string;
  license?: string;
}

export interface Verse {
  id: number;
  translation: string;
  book_id: number;
  chapter: number;
  verse: number;
  text: string;
}
