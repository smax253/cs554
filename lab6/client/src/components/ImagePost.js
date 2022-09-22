import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import queries from '../queries';
const ImagePost = ({ elem, deletable }) => {
    const [updateImage] = useMutation(queries.UPDATE_IMAGE);
    const [deleteImage] = useMutation(queries.DELETE_IMAGE);
    const [deleted, setDeleted] = useState(false);

    const binElement = React.useCallback(
        (bin, elem) => {
            elem.binned = bin;
            updateImage({
                variables: {
                    ...elem,
                },
            });
        },
        [updateImage]
    );

    const deleteImageElement = React.useCallback(
        (elem) => {
            deleteImage({
                variables: {
                    id: elem.id,
                },
            });
            setDeleted(true);
        },
        [deleteImage]
    );

    return (
        <div key={elem.id} className="image-card">
            <div>{elem.description}</div>
            <div>an image by: {elem.posterName}</div>
            <img src={elem.url} alt={`from ${elem.posterName}`} />
            <div className="button-container">
                {elem.binned ? (
                    <button
                        disabled={deleted}
                        onClick={() => binElement(false, elem)}
                    >
                        remove from bin
                    </button>
                ) : (
                    <button
                        disabled={deleted}
                        onClick={() => binElement(true, elem)}
                    >
                        add to bin
                    </button>
                )}
                {deletable && (
                    <button
                        disabled={deleted}
                        onClick={() => {
                            deleteImageElement(elem);
                        }}
                    >
                        {deleted ? 'image deleted' : 'delete image'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImagePost;
