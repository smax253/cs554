import actions from '../../actions';
import getComicData from '../../api/comics/getComic';

const getComic = async ({ comicId, dispatch, client }) => {
    let comicData;
    try {
        comicData = await getComicData({ comicId, client });
    } catch (error) {
        console.error(error);
        dispatch(actions.updateSinglePageData('comics', null, true));
    }
    console.log(comicData)
    dispatch(actions.updateSinglePageData('comics', comicData, false));
};

export default getComic;
