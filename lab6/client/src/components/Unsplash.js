import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import ImageList from './ImageList';

const Unsplash = () => {
    const [pageNum, setPageNum] = useState(1);

    const { loading, error, data } = useQuery(queries.GET_UNSPLASH, {
        fetchPolicy: 'no-cache',
        variables: {
            pageNum: pageNum,
        },
    });

    const nextPage = React.useCallback(() => {
        setPageNum(pageNum + 1);
    }, [pageNum]);

    return (
        <div className={'unsplash'}>
            <ImageList
                isLoading={loading}
                isError={error}
                data={data && data.unsplashImages}
            />
            <button className={'next-page'} onClick={nextPage}>
                See more
            </button>
        </div>
    );
};

export default Unsplash;
