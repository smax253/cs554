import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useParams } from 'react-router-dom';
import renderLinks from '../../helpers/renderLinks';
import getComic from '../../use_cases/comics/getComic';
import ErrorComponent from '../ErrorComponent';

const SingleComic = () => {
    const { id } = useParams();
    const [comicData, setComicData] = React.useState(null);
    const [pageLoading, setPageLoading] = React.useState(false);
    const [pageError, setPageError] = React.useState(null);
    React.useEffect(() => {
        setPageLoading(true);
        setPageError(false);
        getComic({
            comicId: id,
            setPageError,
            setComicData,
            setPageLoading,
        });
    }, [id, setComicData, setPageLoading, setPageError]);
    return pageLoading ? (
        <div>Loading</div>
    ) : pageError ? (
        <ErrorComponent error={'Comic not found!'} />
    ) : (
        comicData && (
            <Container>
                <h1>{comicData.getTitle()}</h1>
                <img
                    src={comicData.getThumbnail()}
                    alt={comicData.getTitle()}
                    className="single-portrait"
                />
                <h2>Creators</h2>
                {comicData.getCreators() &&
                comicData.getCreators().length > 0 ? (
                    comicData.getCreators().map((creator) => {
                        return (
                            <h3 key={creator.getName()}>
                                {creator.getName()}, {creator.getRole()}
                            </h3>
                        );
                    })
                ) : (
                    <h3>There are no creators in the database.</h3>
                )}
                <h2>Description</h2>
                {comicData.getDescription() ? (
                    <h3
                        dangerouslySetInnerHTML={{
                            __html: comicData.getDescription(),
                        }}
                    ></h3>
                ) : (
                    <h3>There is no description available.</h3>
                )}
                <h2>Related Characters</h2>
                {comicData.getCharacters() &&
                comicData.getCharacters().length > 0 ? (
                    renderLinks('characters', comicData.getCharacters())
                ) : (
                    <h3>There are no related characters in the database.</h3>
                )}
                <h2>Related Series</h2>
                {comicData.getTitle() ? (
                    <a href={`/series/${comicData.getSeries().getId()}`}>
                        {comicData.getTitle()}
                    </a>
                ) : (
                    <h3>There are no related series in the database.</h3>
                )}

                <div>
                    <a href="/">Go home</a>
                </div>
            </Container>
        )
    );
};

export default SingleComic;
