import getSeriesData from '../../api/series/getSeries';

const getSeries = async ({
    setSeriesData,
    seriesId,
    setPageError,
    setPageLoading,
}) => {
    let seriesData;
    try {
        seriesData = await getSeriesData({ seriesId });
    } catch (error) {
        setPageError(error);
        setPageLoading(false);
    }
    setSeriesData(seriesData);
    setPageLoading(false);
};

export default getSeries;
