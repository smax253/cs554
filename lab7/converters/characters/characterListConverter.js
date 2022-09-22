const characterWrapper = (charData) => ({
    id: charData.id,
    name: charData.name,
    description: charData.description,
    thumbnail: charData.thumbnail.path + '.' + charData.thumbnail.extension,
});

const characterListConverter = (characterList) => {
    const characterData = characterList.data;

    const CharacterList = {
        offset: characterData.offset,
        limit: characterData.limit,
        total: characterData.total,
        count: characterData.count,
        results: characterData.results.map((res) => characterWrapper(res)),
    };

    return CharacterList;
};

module.exports = characterListConverter;
