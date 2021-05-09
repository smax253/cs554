const Character = ({
    id,
    name,
    description,
    urls,
    thumbnail,
    comics,
    series,
}) => ({
    getId: () => id,
    getName: () => name,
    getDescription: () => description,
    getUrls: () => urls,
    getThumbnail: () => thumbnail.path + '.' + thumbnail.extension,
    getComics: () => comics,
    getSeries: () => series,
});

export default Character;
