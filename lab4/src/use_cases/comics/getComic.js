import getComicData from '../../api/comics/getComic';

const getComic = async ({
    setComicData,
    comicId,
    setPageError,
    setPageLoading,
}) => {
    let comicData;
    try {
        comicData = await getComicData({ comicId });
    } catch (error) {
        setPageError(error);
        setPageLoading(false);
    }
    setComicData(comicData);
    setPageLoading(false);
};

export default getComic;
