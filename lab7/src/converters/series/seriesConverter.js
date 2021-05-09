import InnerLink from '../../entities/InnerLink';
import Series from '../../entities/series/series';
import extractIdFromURI from '../../helpers/extractIdFromURI';

const seriesConverter = (seriesResponse) => {
    const seriesData = seriesResponse.data.results[0];
    seriesData.comics = seriesData.comics.items.map((item) => {
        item.id = extractIdFromURI(item.resourceURI);
        return InnerLink(item);
    });
    seriesData.characters = seriesData.characters.items.map((item) => {
        item.id = extractIdFromURI(item.resourceURI);
        return InnerLink(item);
    });
    return Series(seriesData);
};

export default seriesConverter;
