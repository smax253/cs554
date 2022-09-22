import { checkValidNonNegativeInteger } from '../../helpers/checkValidNum';
import comicListConverter from '../../converters/comics/comicListConverter';
import queries from '../../queries';
const getSearchPage = async ({ page, limit, query, client }) => {
    if (!checkValidNonNegativeInteger(page)) {
        throw RangeError('Page must be a non-negative integer.');
    }

    const { data } = await client.query({
        query: queries.GET_COMIC_SEARCH,
        variables: { page: +page, query },
    });
    console.log(data);
    return comicListConverter(data.getComicList);
};

export default getSearchPage;
