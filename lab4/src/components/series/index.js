import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import {
    Link,
    Route,
    Switch,
    useHistory,
    useRouteMatch,
} from 'react-router-dom';
import SeriesPage from './SeriesPage';
import SeriesSearch from './SeriesSearch';
import SingleSeries from './SingleSeries';
const Series = () => {
    const { path } = useRouteMatch();
    const history = useHistory();
    const [searchTerm, setSearchTerm] = React.useState('');
    return (
        <Container>
            <div>
                <h1>Series</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        history.push(`${path}/search/${searchTerm}/page/0`);
                    }}
                >
                    <label htmlFor="search-input">Search</label>
                    <input
                        id="search-input"
                        onChange={({ target }) => {
                            setSearchTerm(target.value);
                        }}
                        value={searchTerm}
                        type="text"
                    />
                    <Link to={`${path}/search/${searchTerm}/page/0`}>
                        Submit
                    </Link>
                </form>
            </div>
            <Switch>
                <Route path={`${path}/search/:query/page/:page`}>
                    <SeriesSearch
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </Route>
                <Route path={`${path}/page/:page`}>
                    <SeriesPage />
                </Route>
                <Route path={`${path}/:id`}>
                    <SingleSeries />
                </Route>
            </Switch>
        </Container>
    );
};

export default Series;
