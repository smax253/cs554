import Comic from '../../entities/comics/comic';
import Creator from '../../entities/comics/creator';
import InnerLink from '../../entities/InnerLink';

const comicConverter = (comicResponse) => {
    const comicData = {...comicResponse};
    comicData.characters = comicData.characters.map((item) => {
        return InnerLink(item);
    });
    comicData.series = InnerLink(comicData.series);
    comicData.creators = comicData.creators.map((creator) =>
        Creator(creator)
    );
    return Comic(comicData);
};

export default comicConverter;
