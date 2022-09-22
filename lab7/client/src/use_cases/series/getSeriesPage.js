import actions from '../../actions';
import getPage from '../../api/series/getPage';

const getSeriesPage = async ({ page, dispatch, client }) => {
    let pageData;
    try {
        pageData = await getPage({ page, limit: 20, client });
        dispatch(actions.updatePageData('series', pageData, false));
    } catch (error) {
        dispatch(actions.updatePageData('series', null, true));
        return;
    }
};

export default getSeriesPage;
