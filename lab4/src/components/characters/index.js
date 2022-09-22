import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useHistory,
} from 'react-router-dom';
import CharacterPage from './CharacterPage';
import CharacterSearch from './CharacterSearch';
import SingleCharacter from './SingleCharacter';

const Characters = () => {
    const { path } = useRouteMatch();
    const history = useHistory();
    const [searchTerm, setSearchTerm] = React.useState('');

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
