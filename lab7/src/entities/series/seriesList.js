const SeriesList = ({ offset, limit, total, count, results }) => ({
    getOffset: () => offset,
    getLimit: () => limit,
    getTotal: () => total,
    getCount: () => count,
    getResults: () => results.map((res) => SeriesWrapper(res)),
});

const SeriesWrapper = ({ id, title, description, thumbnail }) => ({
    getId: () => id,
    getTitle: () => title,
    getDescription: () => description,
    getThumbnail: () => thumbnail.path + '.' + thumbnail.extension,
});

export default SeriesList;
