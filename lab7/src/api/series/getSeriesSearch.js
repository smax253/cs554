import getApiUrl from '../../config/credentials';
import { checkValidNonNegativeInteger } from '../../helpers/checkValidNum';
import axios from 'axios';
import seriesListConverter from '../../converters/series/seriesListConverter';
const getSearchPage = async ({ page, limit, query }) => {
    if (!checkValidNonNegativeInteger(page)) {
        throw RangeError('Page must be a non-negative integer.');
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = pageNum * limitNum;
    const apiUrl = getApiUrl({
        baseUrl: 'https://gateway.marvel.com:443/v1/public/series',
        args: {
            limit: limitNum,
            offset: skip,
            titleStartsWith: query,
        },
    });
    const { data } = await axios.get(apiUrl);
    return seriesListConverter(data.data);
};

export default getSearchPage;
