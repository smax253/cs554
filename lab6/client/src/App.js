import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client';
import './App.scss';
import Unsplash from './components/Unsplash';
import Bin from './components/Bin';
import MyPosts from './components/MyPosts';
import NewPost from './components/NewPost';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
    }),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <span>🗑️ Binterest</span>
                    </header>
                    <div className="App-body">
                        <nav>
                            <Link to="/my-bin">my bin</Link>
                            <span> | </span>
                            <Link to="/">images</Link>
                            <span> | </span>
                            <Link to="my-posts">my posts</Link>
                        </nav>
                        <Switch>
                            <Route exact path="/">
                                <Unsplash />
                            </Route>
                            <Route path="/my-bin">
                                <Bin />
                            </Route>
                            <Route path="/my-posts">
                                <MyPosts />
                            </Route>
                            <Route path="/new-post">
                                <NewPost />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
