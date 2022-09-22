import actions from '../../actions';
import getSeriesData from '../../api/series/getSeries';

const getSeries = async ({ seriesId, dispatch, client }) => {
    let seriesData;
    try {
        seriesData = await getSeriesData({ seriesId, client });
    } catch (error) {
        dispatch(actions.updateSinglePageData('series', null, true));
        return;
    }
    dispatch(actions.updateSinglePageData('series', seriesData, false));
};

export default getSeries;
