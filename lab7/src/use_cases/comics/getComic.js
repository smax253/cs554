import actions from '../../actions';
import getComicData from '../../api/comics/getComic';

const getComic = async ({ comicId, dispatch }) => {
    let comicData;
    try {
        comicData = await getComicData({ comicId });
    } catch (error) {
        dispatch(actions.updateSinglePageData('comics', null, true));
    }
    dispatch(actions.updateSinglePageData('comics', comicData, false));
};

export default getComic;
