const ComicList = ({ offset, limit, total, count, results }) => ({
    getOffset: () => offset,
    getLimit: () => limit,
    getTotal: () => total,
    getCount: () => count,
    getResults: () => results.map((res) => ComicWrapper(res)),
});

const ComicWrapper = ({ id, title, description, thumbnail }) => ({
    getId: () => id,
    getTitle: () => title,
    getDescription: () => description,
    getThumbnail: () => thumbnail,
});

export default ComicList;
