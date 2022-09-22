import { checkValidNonNegativeInteger } from '../../helpers/checkValidNum';
import characterListConverter from '../../converters/characters/characterListConverter';
import queries from '../../queries';
const getPage = async ({ page, limit, client }) => {
    console.log('page', page);
    if (!checkValidNonNegativeInteger(page)) {
        throw RangeError('Page must be a non-negative integer.');
    }

    const data = await client.query({
        query: queries.GET_CHARACTER_PAGE,
        variables: {
            page: +page,
        },
    });
    return characterListConverter(data.data.getCharacterList);
};

export default getPage;
