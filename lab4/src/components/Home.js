import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>
                Welcome to my site! This site is designed to talk about Marvel
                and explore the Marvel universe through the API. Click on a
                category below to get started.
            </p>
            <div className="links">
                <Link to="/characters/page/0">Characters</Link>
                <Link to="/comics/page/0">Comics</Link>
                <Link to="/series/page/0">Series</Link>
            </div>
        </div>
    );
};

export default Home;
