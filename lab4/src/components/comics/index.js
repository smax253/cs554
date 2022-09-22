import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import {
    Link,
    Route,
    Switch,
    useHistory,
    useRouteMatch,
} from 'react-router-dom';
import ComicSearch from './ComicSearch';
import ComicsPage from './ComicsPage';
import SingleComic from './SingleComic';

const Comics = () => {
    let { path } = useRouteMatch();
    let history = useHistory();
    const [searchTerm, setSearchTerm] = React.useState('');
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
