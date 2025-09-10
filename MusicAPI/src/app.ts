import express, { Request, Response } from "express";
import albumsRouter from './albums/album.routes';
import artistsRouter from './artists/artists.routes';
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

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
    res.send('<h1>Welcome to the Music API</h1>');
});

app.use('/', [albumsRouter , artistsRouter]);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});