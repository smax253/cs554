import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navigation = ({ hasPrevPage, hasNextPage, pageNum }) => {
    return (
        <div className="navigation">
            {hasPrevPage && (
                <div className="nav-button">
                    <Link to={`/shows/page/${pageNum - 1}`}>Previous Page</Link>
                </div>
            )}
            {hasNextPage && (
                <div className="nav-button">
                    <Link to={`/shows/page/${pageNum + 1}`}>Next Page</Link>
                </div>
            )}
        </div>
    );
};

export default Navigation;
