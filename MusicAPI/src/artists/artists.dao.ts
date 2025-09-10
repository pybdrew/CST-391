import { execute } from '../services/mysql.connector';
import { Artist } from './artist.model';
import { artistQueries } from './artists.queries';

export const readArtists = async () => {
    return execute<Artist[]>(artistQueries.readArtists, []);
};