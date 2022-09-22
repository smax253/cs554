import actions from '../../actions';
import getSearchPage from '../../api/comics/getComicSearch';

const getComicSearch = async ({ page, query, dispatch, client }) => {
    let pageData;
    try {
        pageData = await getSearchPage({ page, limit: 20, query, client });
        dispatch(actions.updatePageData('comics', pageData, false));
    } catch (error) {
        dispatch(actions.updatePageData('comics', null, true));
        return;
    }
};

export default getComicSearch;
