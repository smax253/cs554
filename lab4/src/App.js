import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Series from './components/series';
import Comics from './components/comics';
import Characters from './components/characters';
import './scss/custom.scss';
import ErrorComponent from './components/ErrorComponent';

function App() {
    return (
        <Router>
            <div className="App">
                <div style={{ width: '100%', textAlign: 'start' }}>
                    <Link to="/">Return home</Link>
                </div>
                <div className="App-body">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/characters">
                            <Characters />
                        </Route>
                        <Route path="/series">
                            <Series />
                        </Route>
                        <Route path="/comics">
                            <Comics />
                        </Route>
                        <Route path="*">
                            <ErrorComponent error={'Page not found!'} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
