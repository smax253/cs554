import { useMutation } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router';
import queries from '../queries';

const NewPost = () => {
    const [uploadImage] = useMutation(queries.UPLOAD_IMAGE);
    const [urlInput, setUrlInput] = React.useState('');
    const [descInput, setDescInput] = React.useState('');
    const [nameInput, setNameInput] = React.useState('');
    const [formMessage, setFormMessage] = React.useState('');
    const history = useHistory();

    const upload = React.useCallback(
        (event) => {
            event.preventDefault();
            if (!urlInput || !urlInput.trim()) {
                setFormMessage('Url must not be empty!');
                return;
            }
            uploadImage({
                variables: {
                    url: urlInput.trim(),
                    description: descInput.trim(),
                    posterName: nameInput.trim(),
                },
            });
            history.push('/my-posts');
        },
        [descInput, nameInput, urlInput, setFormMessage, uploadImage, history]
    );
    return (
        <form className={'new-image-form'} onSubmit={upload}>
            <label htmlFor="image-url">image url</label>
            <input
                id="image-url"
                type="text"
                onChange={(event) => setUrlInput(event.target.value)}
            ></input>
            <label htmlFor="image-description">image description</label>
            <input
                id="image-description"
                type="text"
                onChange={(event) => setDescInput(event.target.value)}
            ></input>
            <label htmlFor="image-poster-name">poster name</label>
            <input
                id="image-poster-name"
                type="text"
                onChange={(event) => setNameInput(event.target.value)}
            ></input>
            {formMessage && <span>{formMessage}</span>}
            <button type="submit">upload</button>
        </form>
    );
};

export default NewPost;
