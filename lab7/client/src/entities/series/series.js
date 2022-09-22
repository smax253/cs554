const Series = ({
    title,
    description,
    isbn,
    thumbnail,
    format,
    characters,
    comics,
    rating,
}) => ({
    getTitle: () => title,
    getDescription: () => description,
    getISBN: () => isbn,
    getThumbnail: () => thumbnail,
    getFormat: () => format,
    getCharacters: () => characters,
    getComics: () => comics,
    getRating: () => rating,
});

export default Series;
