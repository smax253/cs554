const linkConverter = require('../linkConverter');

const characterConverter = (characterResponse) => {
    const charData = characterResponse.data.results[0];
    const comics = charData.comics.items.map(linkConverter);
    const series = charData.series.items.map(linkConverter);
    // charData.comics = charData.comics.items.map((item) => {
    //     item.id = extractIdFromURI(item.resourceURI);
    //     return InnerLink(item);
    // });
    // charData.series = charData.series.items.map((item) => {
    //     item.id = extractIdFromURI(item.resourceURI);
    //     return InnerLink(item);
    // });
    console.log(charData);
    const Character = {
        id: charData.id,
        name: charData.name,
        description: charData.description,
        thumbnail: charData.thumbnail.path + '.' + charData.thumbnail.extension,
        comics,
        series,
    };
    return Character;
};

module.exports = characterConverter;
