import { checkValidNonNegativeInteger } from '../../helpers/checkValidNum';
import characterListConverter from '../../converters/characters/characterListConverter';
import queries from '../../queries';
const getSearchPage = async ({ page, limit, query, client }) => {
    if (!checkValidNonNegativeInteger(page)) {
        throw RangeError('Page must be a non-negative integer.');
    }

    const { data } = await client.query({
        query: queries.GET_CHARACTER_SEARCH,
        variables: {
            page: +page,
            query,
        },
    });
    return characterListConverter(data.getCharacterList);
};

export default getSearchPage;
