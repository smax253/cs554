import actions from '../../actions';
import getPage from '../../api/comics/getPage';

const getComicPage = async ({ page, dispatch, client }) => {
    let pageData;
    try {
        pageData = await getPage({ page, limit: 20, client });
        dispatch(actions.updatePageData('comics', pageData, false));
    } catch (error) {
        console.error(error);
        dispatch(actions.updatePageData('comics', null, error));
        return;
    }
};

export default getComicPage;
