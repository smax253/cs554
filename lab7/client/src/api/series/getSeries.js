import seriesConverter from '../../converters/series/seriesConverter';
import { checkValidString } from '../../helpers/checkValidString';
import queries from '../../queries';

const getSeriesData = async ({ seriesId, client }) => {
    if (!checkValidString(seriesId)) {
        throw TypeError('Series id must be a string.');
    }
    const { data } = await client.query({query: queries.GET_SERIES, variables: {id: seriesId}});
    return seriesConverter(data.getSeries);
};

export default getSeriesData;
