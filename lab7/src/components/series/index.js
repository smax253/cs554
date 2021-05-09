import React, { useMemo } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import {
    Link,
    Route,
    Switch,
    useHistory,
    useRouteMatch,
} from 'react-router-dom';
import actions from '../../actions';
import SeriesPage from './SeriesPage';
import SeriesSearch from './SeriesSearch';
import SingleSeries from './SingleSeries';
const Series = () => {
    const dispatch = useDispatch();
    const searchState = useSelector((state) => state.search);
    const { path } = useRouteMatch();
    const history = useHistory();
    const searchTerm = useMemo(() => searchState.searchTerm, [searchState]);
    React.useEffect(() => {
        if (searchState.type !== 'comics')
            dispatch(actions.setSearchType('comics'));
    });
    const setSearchTerm = React.useCallback(
        (term) => {
            dispatch(actions.setSearchTerm(term));
        },
        [dispatch]
    );
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
