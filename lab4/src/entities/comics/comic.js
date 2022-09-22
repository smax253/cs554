const Comic = ({
    title,
    description,
    isbn,
    thumbnail,
    format,
    characters,
    series,
    creators,
}) => ({
    getTitle: () => title,
    getDescription: () => description,
    getISBN: () => isbn,
    getThumbnail: () => thumbnail.path + '.' + thumbnail.extension,
    getFormat: () => format,
    getCharacters: () => characters,
    getSeries: () => series,
    getCreators: () => creators,
});

export default Comic;
