# Milestone 3
- Andrew Rodriguez
- 14 Sep 2025

## Introduction
> [!NOTE]  
> This is refined from [Milestone 2](../../Milestones/Milestone%202/README.md).  
> Quick link to the [Code](../Inclusion/)

> [!IMPORTANT] 
> View [Challenges, Issues, and Lessons Learned](#challenges-issues-and-lessons-learned)  
> Video for endpoints: [Loom Link](https://www.loom.com/share/cfbcf69e927645738d62559586cd1502?sid=cadc7711-d72a-4856-9cea-a53214bda115)  
> View PowerPoint .PDF version here: [Milestone 3 PowerPoint](./Milestone%203.pdf)  


Inclusion is a Christian-themed personal study web app that enables users to read, update, and delete personal study notes tied to specific Bible verses and translations. This milestone focuses on implementing the REST API in TypeScript using Express/Node.js with a MySQL database. The API now supports CRUD operations, allowing users to retrieve existing comments, update their study notes, and remove entries as needed. Postman was used to test endpoints and verify functionality, while MySQL Workbench confirmed database changes. These enhancements bring the application closer to its goal of providing a reliable and interactive tool for scripture engagement.

## Functionality Requirements

- As a user, I want to view all Bible verses so I can select a verse to study.
- As a user, I want to search for verses by book, chapter, or keyword so I can
quickly find specific scripture.
- As a user, I want to view all comments for a selected verse so I can see others’
insights or my previous notes.
- As a user, I want to create a personal comment for a verse so I can record my
study notes.
- As a user, I want to edit my comments to update or clarify my insights.
- As a user, I want to delete my own comments so I can remove outdated or
incorrect notes.
- As a user, I want to filter comments by translation so I can compare insights
across versions like KJV and ACV.
- As a user, I want to view the details of a verse, including book, chapter, and
translation, so I have context for my comments.
- As a user, I want to see a list of my own comments in one place so I can review
my personal study notes efficiently.
- As a user, I want to sort comments by date so I can see my most recent notes first.
- As a user, I want to navigate easily between verses and comments so I can study
without confusion.
<br>

## Database Design: ER Diagram

**Tables and Fields**
![ER Diagram](../Milestone%202/images/ER.png)

**Relationships**
- books.id → verses.book_id (one-to-many)
- translations.translation → verses.translation (one-to-many)
- verses.id → VerseComments.verse_id (one-to-many)

## UI Sitemap (Text)

1. Home Page
    1. Browse Verses
        1. Verse Detail
            1. Comments (Create, Read, Update, Delete)
2. My Comments
    1. List of personal comments
        1. Edit/Delete options

3. About Page

## UI Wireframes (Text)

**Home Page**
- Header: Application Title (“Inclusion”)
- Navigation: Browse Verses, My Comments, About, and Admin
- Main Section: Welcome text and quick link buttons

**Browse Verses Page**
- Dropdowns: Select Translation, then Select Book, then Select Chapter, and finally Select
Verse.  
- Button: “View Verse”
- Below: Display the Verse Text.
- Comments Section: List of Comments, plus an “Add Comment” button.

**Verse Detail Page**
- Verse text in large font
- Comment box (textarea + submit)
- Existing comments with Edit/Delete buttons

**My Comments Page**
- List of users’ comments (table or cards)
- Actions: Edit, Delete

**About Page**
- Static text: Purpose of the app, Christian theme inspiration

## UML Classes (Text)
**Book**
- Attributes: id: int, translation: string, name: string, testament: enum(OT, NT)
- Methods: getBooks(), getBookById(id)
- Relationships: 1 Book → many Verses

**Translation**
- Attributes: translation: string, title: string, license: text
- Methods: getTranslations(), getTranslationById(id)

**Verse**
- Attributes: id: int, translation: string, book_id: int, chapter: int, verse: int, text: string
- Methods: getVersesByBook(book_id), getVerseById(id)
- Relationships: 1 Verse → many VerseComments

**VerseComment**
- Attributes: id: int, verse_id: int, comment_text: text, created_at: datetime, translation:
string
- Methods: addComment(c), updateComment(id, c), deleteComment(id),
getCommentsByVerse(verse_id)

**CommentService**
- Methods: createComment(data), readComment(id), updateComment(id, data),
deleteComment(id), listComments(verse_id)
<br>

## REST Endpoints
|Method|Endpoint|Description|Postman
|--|--|--|--|
|GET|/comments|Retrieve all comments|[Postman](./images/GET%20all.png)|
|GET|/comments/:id|Retrieve comment by id|[Postman](./images/GET%20id.png)|
|POST|/comments|Create a new comment|[Postman](./images/POST.png)|
|PUT|/comments/:id|Update comment by id|[Postman](./images/PUT.png)|
|DELETE|/comments/:id|Delete comment by id|[Postman](./images/DEL.png)|


## Risks
1. Database Schema Changes: Future modifications to the Bible verse or translation tables
could potentially disrupt CRUD operations or necessitate updates to the API.
2. Data Integrity: Ensure that user comments are accurately linked to verses and
translations, avoiding duplication or loss.
3. Front-end Integration: The Angular and React versions of the app may exhibit varying
behaviors when consuming the same API, potentially leading to inconsistencies.
4. User Authentication: If implemented later, authentication could introduce additional
complexity for comment creation, editing, and deletion.
5. Scalability: A large number of verses (approximately 500,000+) may slow down searches
or comment retrieval.
6. Cross-Translation Compatibility: Comparing and displaying comments across multiple
translations may necessitate additional logic and meticulous UI design.
7. Deployment & Environment Differences: Variations between development, testing, and
production environments could cause runtime errors ( Node version, TypeScript
configuration, MySQL setup).
8. Time Constraints: Completing both Angular and React front-ends and back-end services
may pose challenges within project deadlines.

## Challenges, Issues, and Lessons Learned  
No major challenges or bugs were encountered during this milestone, as the implementation of the REST API, database connection, and Postman testing proceeded smoothly. All CRUD operations functioned as expected, with changes accurately reflected in MySQL Workbench. The key lesson learned was how to route and structure custom API endpoints in Express using TypeScript, which provided valuable insight into organizing backend logic for future development projects.  


## Conclusion

The Inclusion project presents a personal Bible study web application designed to help users engage with scripture and record verse-specific comments across multiple translations. Its backend architecture provides CRUD functionality through REST API endpoints, ensuring reliable management of user-created content. Together, the ER diagram, API design, and supporting documentation illustrate the system’s structure, data relationships, and functional flow, forming a strong foundation for current implementation and future enhancements.