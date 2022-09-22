import characterConverter from '../../converters/characters/characterConverter';
import { checkValidString } from '../../helpers/checkValidString';
import queries from '../../queries';

const getCharacterData = async ({ characterId, client }) => {
    if (!checkValidString(characterId)) {
        throw TypeError('Character id must be a string.');
    }
    const { data } = await client.query({
        query: queries.GET_CHARACTER,
        variables: {
            id: characterId,
        },
    });

    return characterConverter(data.getCharacter);
};

export default getCharacterData;
