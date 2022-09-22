import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useParams } from 'react-router';
import renderLinks from '../../helpers/renderLinks';
import getCharacter from '../../use_cases/characters/getCharacter';
import ErrorComponent from '../ErrorComponent';

const SingleCharacter = () => {
    const { id } = useParams();
    const [characterData, setCharacterData] = React.useState(null);
    const [pageLoading, setPageLoading] = React.useState(false);
    const [pageError, setPageError] = React.useState(null);
    React.useEffect(() => {
        setPageLoading(true);
        setPageError(false);
        getCharacter({
            characterId: id,
            setPageError,
            setCharacterData,
            setPageLoading,
        });
    }, [id, setCharacterData, setPageLoading, setPageError]);
    return pageLoading ? (
        <div>Loading</div>
    ) : pageError ? (
        <ErrorComponent error={'Character not found!'} />
    ) : (
        characterData && (
            <Container>
                <h1>{characterData.getName()}</h1>
                <img
                    src={characterData.getThumbnail()}
                    alt={characterData.getName()}
                    className="single-portrait"
                />
                <h2>Description</h2>
                {characterData.getDescription() ? (
                    <h3
                        dangerouslySetInnerHTML={{
                            __html: characterData.getDescription(),
                        }}
                    ></h3>
                ) : (
                    <h3>This character has no provided description.</h3>
                )}
                <h2>Related Series</h2>
                {characterData.getSeries() &&
                characterData.getSeries().length > 0 ? (
                    renderLinks('series', characterData.getSeries())
                ) : (
                    <h3>There are no related series in the database.</h3>
                )}
                <h2>Related Comics</h2>
                {characterData.getComics() &&
                characterData.getComics().length > 0 ? (
                    renderLinks('comics', characterData.getComics())
                ) : (
                    <h3>There are no related comics in the database.</h3>
                )}
                <div>
                    <a href="/">Go home</a>
                </div>
            </Container>
        )
    );
};

export default SingleCharacter;
