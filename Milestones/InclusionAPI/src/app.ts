// re-used from music API

import express, { Request, Response } from "express";
import commentsRouter from './comments/comments.routes';
import booksRouter from './books/books.routes';
import versesRouter from './verses/verses.routes';
import translationsRouter from './translations/translations.routes';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import logger from "./middleware/logger.middleware";

dotenv.config();

// create an instance of Express application
const app = express();

// define port number server will listen to
const port = process.env.PORT;

// enable all CORS request
// needs to be installed
// npm install cors
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// adding set of security middleware
// needs to be installed
// npm install helmet
app.use(helmet());

console.log(process.env.MY_SQL_DB_HOST);

//MySQLConnector.initializeMySqlConnector();

if (process.env.NODE_ENV == 'development') {
    // add logger middleware
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode')
}

// Application routes
// root route
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Bible Application</h1>');
});

app.use('/', [commentsRouter]);

app.use('/books', booksRouter);

app.use('/verses', versesRouter);

app.use('/translations', translationsRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});