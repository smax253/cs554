import getApiUrl from '../../config/credentials';
import { checkValidNonNegativeInteger } from '../../helpers/checkValidNum';
import axios from 'axios';
import comicListConverter from '../../converters/comics/comicListConverter';
const getPage = async ({ page, limit }) => {
    if (!checkValidNonNegativeInteger(page)) {
        throw RangeError('Page must be a non-negative integer.');
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = pageNum * limitNum;
    const apiUrl = getApiUrl({
        baseUrl: 'https://gateway.marvel.com:443/v1/public/comics',
        args: {
            limit: limitNum,
            offset: skip,
        },
    });
    const { data } = await axios.get(apiUrl);

    return comicListConverter(data.data);
};

export default getPage;
