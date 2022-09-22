import React from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import ImageList from './ImageList';

const Bin = () => {
    const { loading, error, data } = useQuery(queries.GET_BINNED, {
        fetchPolicy: 'no-cache',
        variables: {
            pageNum: 1,
        },
    });

    return (
        <div>
            <ImageList
                isLoading={loading}
                isError={error}
                data={data && data.binnedImages}
            />
        </div>
    );
};

export default Bin;
