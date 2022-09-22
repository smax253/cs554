import comicConverter from '../../converters/comics/comicConverter';
import { checkValidString } from '../../helpers/checkValidString';
import queries from '../../queries';

const getComicData = async ({ comicId, client }) => {
    if (!checkValidString(comicId)) {
        throw TypeError('Comic id must be a string.');
    }
    const {data} = await client.query({query: queries.GET_COMIC, variables: {id: comicId}});
    return comicConverter(data.getComic);
};

export default getComicData;
