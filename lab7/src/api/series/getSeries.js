import axios from 'axios';
import getApiUrl from '../../config/credentials';
import seriesConverter from '../../converters/series/seriesConverter';
import { checkValidString } from '../../helpers/checkValidString';

const getSeriesData = async ({ seriesId }) => {
    if (!checkValidString(seriesId)) {
        throw TypeError('Series id must be a string.');
    }
    const apiUrl = getApiUrl({
        baseUrl: `https://gateway.marvel.com:443/v1/public/series/${seriesId}`,
        args: {},
    });
    const { data } = await axios.get(apiUrl);
    return seriesConverter(data);
};

export default getSeriesData;
