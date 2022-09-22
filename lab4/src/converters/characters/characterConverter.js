import Character from '../../entities/characters/character';
import InnerLink from '../../entities/InnerLink';
import extractIdFromURI from '../../helpers/extractIdFromURI';

const characterConverter = (characterResponse) => {
    const charData = characterResponse.data.results[0];
    charData.comics = charData.comics.items.map((item) => {
        item.id = extractIdFromURI(item.resourceURI);
        return InnerLink(item);
    });
    charData.series = charData.series.items.map((item) => {
        item.id = extractIdFromURI(item.resourceURI);
        return InnerLink(item);
    });
    return Character(charData);
};

export default characterConverter;
