import React, { useMemo } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useHistory,
} from 'react-router-dom';
import actions from '../../actions';
import CharacterPage from './CharacterPage';
import CharacterSearch from './CharacterSearch';
import SingleCharacter from './SingleCharacter';

const Characters = () => {
    const dispatch = useDispatch();
    const searchState = useSelector((state) => state.search);

    const { path } = useRouteMatch();
    const history = useHistory();
    const searchTerm = useMemo(() => searchState.searchTerm, [searchState]);
    React.useEffect(() => {
        if (searchState.type !== 'characters')
            dispatch(actions.setSearchType('characters'));
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
                <h1>Characters</h1>
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
                    <CharacterSearch
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </Route>
                <Route path={`${path}/page/:page`}>
                    <CharacterPage />
                </Route>
                <Route path={`${path}/:id`}>
                    <SingleCharacter />
                </Route>
            </Switch>
        </Container>
    );
};

export default Characters;
