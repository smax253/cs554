import actions from '../../actions';
import getPage from '../../api/characters/getPage';

const getCharacterPage = async ({ page, dispatch, client }) => {
    let pageData;
    try {
        pageData = await getPage({ page, limit: 20, client });
        dispatch(actions.updatePageData('characters', pageData, false));
    } catch (error) {
        console.error(error);
        dispatch(actions.updatePageData('characters', null, error));
        return;
    }
};

export default getCharacterPage;
