import actions from '../../actions';
import getCharacterData from '../../api/characters/getCharacter';

const getCharacter = async ({ dispatch, characterId, client }) => {
    let characterData;
    try {
        characterData = await getCharacterData({ characterId, client });
        console.log('char data', characterData);
    } catch (error) {
        console.error(error);
        dispatch(actions.updateSinglePageData('characters', null, true));
        return;
    }
    dispatch(actions.updateSinglePageData('characters', characterData, false));
};

export default getCharacter;
