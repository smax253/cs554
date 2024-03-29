import actions from '../../actions';
import getSearchPage from '../../api/series/getSeriesSearch';

const getSeriesSearch = async ({ page, query, dispatch, client }) => {
    let pageData;
    try {
        pageData = await getSearchPage({ page, limit: 20, query, client });
        dispatch(actions.updatePageData('series', pageData, false));
    } catch (error) {
        dispatch(actions.updatePageData('series', null, true));
        return;
    }
};

export default getSeriesSearch;
