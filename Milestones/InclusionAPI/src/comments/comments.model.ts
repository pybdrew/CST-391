export interface Comment {
// primary key, auto-increment
  id?: number;
  // id of the Bible verse
  verseId: number;
   // user's comment
  commentText: string;
  // timestamp, optional because DB generates it
  createdAt?: Date;
  // bible translation (KJV, AJV, etc.)
  translation: string;
}
