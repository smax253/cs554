import getCharacterData from '../../api/characters/getCharacter';

const getCharacter = async ({
    setCharacterData,
    characterId,
    setPageError,
    setPageLoading,
}) => {
    let characterData;
    try {
        characterData = await getCharacterData({ characterId });
    } catch (error) {
        setPageError(error);
        setPageLoading(false);
    }
    setCharacterData(characterData);
    setPageLoading(false);
};

export default getCharacter;
