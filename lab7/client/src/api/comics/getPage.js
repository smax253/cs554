import { checkValidNonNegativeInteger } from '../../helpers/checkValidNum';
import comicListConverter from '../../converters/comics/comicListConverter';
import queries from '../../queries';
const getPage = async ({ page, limit, client }) => {
    if (!checkValidNonNegativeInteger(page)) {
        throw RangeError('Page must be a non-negative integer.');
    }
    console.log('hello')
    const { data } = await client.query({query: queries.GET_COMIC_PAGE, variables: {page: +page}})
    console.log(data);
    return comicListConverter(data.getComicList);
};

export default getPage;
