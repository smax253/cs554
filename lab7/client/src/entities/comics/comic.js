const Comic = ({
    title,
    description,
    thumbnail,
    characters,
    series,
    creators,
}) => ({
    getTitle: () => title,
    getDescription: () => description,
    getThumbnail: () => thumbnail,
    getCharacters: () => characters,
    getSeries: () => series,
    getCreators: () => creators,
});

export default Comic;
