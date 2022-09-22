const linkConverter = require('../linkConverter');

const seriesConverter = (seriesResponse) => {
    const seriesData = seriesResponse.data.results[0];
    const comics = seriesData.comics.items.map(linkConverter);
    const characters = seriesData.characters.items.map(linkConverter);
    const Series = {
        id: seriesData.id,
        title: seriesData.title,
        description: seriesData.description,
        thumbnail:
            seriesData.thumbnail.path + '.' + seriesData.thumbnail.extension,
        comics,
        characters,
    };
    return Series;
};

module.exports = seriesConverter;
