const seriesWrapper = (seriesData) => ({
    id: seriesData.id,
    title: seriesData.title,
    description: seriesData.description,
    thumbnail: seriesData.thumbnail.path + '.' + seriesData.thumbnail.extension,
});

const seriesListConverter = (seriesList) => {
    const seriesData = seriesList.data;

    const SeriesList = {
        offset: seriesData.offset,
        limit: seriesData.limit,
        total: seriesData.total,
        count: seriesData.count,
        results: seriesData.results.map((res) => seriesWrapper(res)),
    };

    return SeriesList;
};

module.exports = seriesListConverter;
