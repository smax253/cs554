import InnerLink from '../../entities/InnerLink';
import Series from '../../entities/series/series';

const seriesConverter = (seriesResponse) => {
    const seriesData = {...seriesResponse};
    seriesData.comics = seriesData.comics.map((item) => {
        return InnerLink(item);
    });
    seriesData.characters = seriesData.characters.map((item) => {
        return InnerLink(item);
    });
    return Series(seriesData);
};

export default seriesConverter;
