import React from 'react';
import ImagePost from './ImagePost';

const ImageList = ({ isLoading, isError, data, deletable }) => {
    const renderList = React.useCallback(() => {
        console.log(data);
        if (!data) return <div></div>;
        return data.map((elem) => {
            return <ImagePost elem={elem} deletable={deletable} />;
        });
    }, [data, deletable]);

    return isLoading ? (
        <div>Loading...</div>
    ) : isError ? (
        <div>An error occurred, try again later.</div>
    ) : (
        <div className="image-list">{renderList()}</div>
    );
};

export default ImageList;
