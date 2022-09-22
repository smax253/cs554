import axios from 'axios';
import getApiUrl from '../../config/credentials';
import characterConverter from '../../converters/characters/characterConverter';
import { checkValidString } from '../../helpers/checkValidString';

const getCharacterData = async ({ characterId }) => {
    if (!checkValidString(characterId)) {
        throw TypeError('Character id must be a string.');
    }
    const apiUrl = getApiUrl({
        baseUrl: `https://gateway.marvel.com:443/v1/public/characters/${characterId}`,
        args: {},
    });
    const { data } = await axios.get(apiUrl);
    return characterConverter(data);
};

export default getCharacterData;
