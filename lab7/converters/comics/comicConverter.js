const linkConverter = require('../linkConverter');

const creatorConverter = (creator) => {
    return {
        name: creator.name,
        role: creator.role,
    };
};

const comicConverter = (comicResponse) => {
    const comicData = comicResponse.data.results[0];
    const characters = comicData.characters.items.map(linkConverter);
    const series = linkConverter(comicData.series);
    const creators = comicData.creators.items.map(creatorConverter);
    return {
        id: comicData.id,
        title: comicData.title,
        description: comicData.description,
        thumbnail:
            comicData.thumbnail.path + '.' + comicData.thumbnail.extension,
        characters,
        series,
        creators,
    };
};

module.exports = comicConverter;
