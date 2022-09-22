import React from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import ImageList from './ImageList';
import { Link } from 'react-router-dom';

const MyPosts = () => {
    const { loading, error, data } = useQuery(queries.GET_POSTED, {
        fetchPolicy: 'no-cache',
        variables: {
            pageNum: 1,
        },
    });

    return (
        <div className="my-posts">
            <ImageList
                isLoading={loading}
                isError={error}
                data={data && data.userPostedImages}
                deletable
            />
            <div>
                <Link className="upload-image" to="/new-post">
                    upload image
                </Link>
            </div>
        </div>
    );
};

export default MyPosts;
