import getApiUrl from '../../config/credentials';
import { checkValidNonNegativeInteger } from '../../helpers/checkValidNum';
import axios from 'axios';
import characterListConverter from '../../converters/characters/characterListConverter';
const getSearchPage = async ({ page, limit, query }) => {
    if (!checkValidNonNegativeInteger(page)) {
        throw RangeError('Page must be a non-negative integer.');
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = pageNum * limitNum;
    const apiUrl = getApiUrl({
        baseUrl: 'https://gateway.marvel.com:443/v1/public/characters',
        args: {
            limit: limitNum,
            offset: skip,
            nameStartsWith: query,
        },
    });

    const { data } = await axios.get(apiUrl);
    return characterListConverter(data.data);
};

export default getSearchPage;
