import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useParams } from 'react-router';
import renderLinks from '../../helpers/renderLinks';
import getSeries from '../../use_cases/series/getSeries';
import ErrorComponent from '../ErrorComponent';

const SingleSeries = () => {
    const { id } = useParams();
    const [seriesData, setSeriesData] = React.useState(null);
    const [pageLoading, setPageLoading] = React.useState(false);
    const [pageError, setPageError] = React.useState(null);
    React.useEffect(() => {
        setPageLoading(true);
        setPageError(false);
        getSeries({
            seriesId: id,
            setPageError,
            setSeriesData,
            setPageLoading,
        });
    }, [id, setSeriesData, setPageLoading, setPageError]);
    return pageLoading ? (
        <div>Loading</div>
    ) : pageError ? (
        <ErrorComponent error={'Series not found!'} />
    ) : (
        seriesData && (
            <Container>
                <h1>{seriesData.getTitle()}</h1>
                <img
                    src={seriesData.getThumbnail()}
                    alt={seriesData.getTitle()}
                    className="single-portrait"
                />
                <h2>Description</h2>
                {seriesData.getDescription() ? (
                    <h3
                        dangerouslySetInnerHTML={{
                            __html: seriesData.getDescription(),
                        }}
                    ></h3>
                ) : (
                    <h3>There is no description available.</h3>
                )}

                <h2>Related Characters</h2>
                {seriesData.getCharacters() &&
                seriesData.getCharacters().length > 0 ? (
                    renderLinks('characters', seriesData.getCharacters())
                ) : (
                    <h3>There are no related characters in the database.</h3>
                )}
                <h2>Related Comics</h2>
                {seriesData.getComics() && seriesData.getComics().length > 0 ? (
                    renderLinks('comics', seriesData.getComics())
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

export default SingleSeries;
