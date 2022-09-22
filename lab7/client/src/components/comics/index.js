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
import ComicSearch from './ComicSearch';
import ComicsPage from './ComicsPage';
import SingleComic from './SingleComic';

const Comics = () => {
    const dispatch = useDispatch();
    const searchState = useSelector((state) => state.search);
    let { path } = useRouteMatch();
    let history = useHistory();
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
                <h1>Comics</h1>
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
                    <ComicSearch
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </Route>
                <Route path={`${path}/page/:page`}>
                    <ComicsPage />
                </Route>
                <Route path={`${path}/:id`}>
                    <SingleComic />
                </Route>
            </Switch>
        </Container>
    );
};

export default Comics;
