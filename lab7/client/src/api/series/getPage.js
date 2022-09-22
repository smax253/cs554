import { checkValidNonNegativeInteger } from '../../helpers/checkValidNum';
import seriesListConverter from '../../converters/series/seriesListConverter';
import queries from '../../queries';
const getPage = async ({ page, limit, client }) => {
    if (!checkValidNonNegativeInteger(page)) {
        throw RangeError('Page must be a non-negative integer.');
    }

    const { data } = await client.query({query: queries.GET_SERIES_PAGE, variables:{page: +page}});
    return seriesListConverter(data.getSeriesList);
};

export default getPage;
