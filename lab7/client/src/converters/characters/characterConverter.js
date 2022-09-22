import Character from '../../entities/characters/character';
import InnerLink from '../../entities/InnerLink';

const characterConverter = (characterResponse) => {
    const charData = { ...characterResponse };

    charData.comics = charData.comics.map((item) => {
        return InnerLink(item);
    });
    charData.series = charData.series.map((item) => {
        return InnerLink(item);
    });
    return Character(charData);
};

export default characterConverter;
