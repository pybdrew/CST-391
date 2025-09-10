export const artistQueries = {
    readArtists: `
    SELECT
        DISTINCT artist AS artist
    FROM music.albums
    `
}