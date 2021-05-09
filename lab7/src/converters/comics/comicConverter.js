import Comic from '../../entities/comics/comic';
import Creator from '../../entities/comics/creator';
import InnerLink from '../../entities/InnerLink';
import extractIdFromURI from '../../helpers/extractIdFromURI';

const comicConverter = (comicResponse) => {
    const comicData = comicResponse.data.results[0];
    comicData.characters = comicData.characters.items.map((item) => {
        item.id = extractIdFromURI(item.resourceURI);
        return InnerLink(item);
    });
    comicData.series.id = extractIdFromURI(comicData.series.resourceURI);
    comicData.series = InnerLink(comicData.series);
    comicData.creators = comicData.creators.items.map((creator) =>
        Creator(creator)
    );
    return Comic(comicData);
};

export default comicConverter;
