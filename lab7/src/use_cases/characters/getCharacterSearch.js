import actions from '../../actions';
import getSearchPage from '../../api/characters/getCharacterSearch';

const getCharacterSearch = async ({ page, query, dispatch }) => {
    let pageData;
    try {
        pageData = await getSearchPage({ page, limit: 20, query });
        dispatch(actions.updatePageData('characters', pageData, false));
    } catch (error) {
        dispatch(actions.updatePageData('characters', null, true));
        return;
    }
};

export default getCharacterSearch;
