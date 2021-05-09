import actions from '../../actions';
import getCharacterData from '../../api/characters/getCharacter';

const getCharacter = async ({ dispatch, characterId }) => {
    let characterData;
    try {
        characterData = await getCharacterData({ characterId });
    } catch (error) {
        dispatch(actions.updateSinglePageData('characters', null, true));
        return;
    }
    dispatch(actions.updateSinglePageData('characters', characterData, false));
};

export default getCharacter;
