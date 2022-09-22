import axios from 'axios';
import getApiUrl from '../../config/credentials';
import comicConverter from '../../converters/comics/comicConverter';
import { checkValidString } from '../../helpers/checkValidString';

const getComicData = async ({ comicId }) => {
    if (!checkValidString(comicId)) {
        throw TypeError('Comic id must be a string.');
    }
    const apiUrl = getApiUrl({
        baseUrl: `https://gateway.marvel.com:443/v1/public/comics/${comicId}`,
        args: {},
    });
    const { data } = await axios.get(apiUrl);
    return comicConverter(data);
};

export default getComicData;
