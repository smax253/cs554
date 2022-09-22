import { gql } from '@apollo/client';

const GET_UNSPLASH = gql`
    query($pageNum: Int) {
        unsplashImages(pageNum: $pageNum) {
            id
            url
            posterName
            userPosted
            description
            binned
        }
    }
`;

const GET_POSTED = gql`
    query {
        userPostedImages {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

const GET_BINNED = gql`
    query {
        binnedImages {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

const UPDATE_IMAGE = gql`
    mutation(
        $id: ID!
        $url: String
        $posterName: String
        $description: String
        $userPosted: Boolean
        $binned: Boolean
    ) {
        updateImage(
            id: $id
            url: $url
            posterName: $posterName
            description: $description
            userPosted: $userPosted
            binned: $binned
        ) {
            id
        }
    }
`;

const UPLOAD_IMAGE = gql`
    mutation($url: String!, $posterName: String, $description: String) {
        uploadImage(
            url: $url
            posterName: $posterName
            description: $description
        ) {
            id
        }
    }
`;

const DELETE_IMAGE = gql`
    mutation($id: ID!) {
        deleteImage(id: $id) {
            id
        }
    }
`;

const queries = {
    GET_BINNED,
    GET_POSTED,
    GET_UNSPLASH,
    UPDATE_IMAGE,
    UPLOAD_IMAGE,
    DELETE_IMAGE,
};
export default queries;
