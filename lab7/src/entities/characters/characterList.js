const CharacterList = ({ offset, limit, total, count, results }) => ({
    getOffset: () => offset,
    getLimit: () => limit,
    getTotal: () => total,
    getCount: () => count,
    getResults: () => results.map((res) => CharacterWrapper(res)),
});

const CharacterWrapper = ({ id, name, description, thumbnail }) => ({
    getId: () => id,
    getName: () => name,
    getDescription: () => description,
    getThumbnail: () => thumbnail.path + '.' + thumbnail.extension,
});

export default CharacterList;
