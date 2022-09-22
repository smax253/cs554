const comicWrapper = (comicData) => ({
    id: comicData.id,
    title: comicData.title,
    description: comicData.description,
    thumbnail: comicData.thumbnail.path + '.' + comicData.thumbnail.extension,
});

const comicListConverter = (comicList) => {
    const comicListData = comicList.data;
    const ComicList = {
        offset: comicListData.offset,
        limit: comicListData.limit,
        total: comicListData.total,
        count: comicListData.count,
        results: comicListData.results.map((res) => comicWrapper(res)),
    };
    return ComicList;
};

module.exports = comicListConverter;
