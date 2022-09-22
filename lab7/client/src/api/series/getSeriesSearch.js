import { checkValidNonNegativeInteger } from '../../helpers/checkValidNum';
import seriesListConverter from '../../converters/series/seriesListConverter';
import queries from '../../queries';
const getSearchPage = async ({ page, limit, query, client }) => {
    if (!checkValidNonNegativeInteger(page)) {
        throw RangeError('Page must be a non-negative integer.');
    }

    const { data } = await client.query({
        query: queries.GET_SERIES_SEARCH,
        variables: { page: +page, query },
    });
    return seriesListConverter(data.getSeriesList);
};

export default getSearchPage;
