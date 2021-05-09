import actions from '../../actions';
import getSeriesData from '../../api/series/getSeries';

const getSeries = async ({ seriesId, dispatch }) => {
    let seriesData;
    try {
        seriesData = await getSeriesData({ seriesId });
    } catch (error) {
        dispatch(actions.updateSinglePageData('series', null, true));
    }
    dispatch(actions.updateSinglePageData('series', seriesData, false));
};

export default getSeries;
