import { gql } from '@apollo/client';

const GET_CHARACTER_PAGE = gql`
    query($page: Int!) {
        getCharacterList(page: $page) {
            offset
            limit
            total
            count
            results {
                id
                name
                description
                thumbnail
            }
        }
    }
`;

const GET_CHARACTER = gql`
    query($id: ID!) {
        getCharacter(id: $id) {
            id
            name
            description
            thumbnail
            comics {
                id
                name
            }
            series {
                id
                name
            }
        }
    }
`;

const GET_CHARACTER_SEARCH = gql`
    query($page: Int!, $query: String!) {
        getCharacterList(page: $page, query: $query) {
            offset
            limit
            total
            count
            results {
                id
                name
                description
                thumbnail
            }
        }
    }
`;

const GET_COMIC = gql`
query($id: ID!) {
    getComic(id: $id) {
        id
        title
        description
        thumbnail
        creators{
            name
            role
        }
        characters {
            id
            name
        }
        series {
            id
            name
        }
    }
}
`;

const GET_COMIC_SEARCH = gql`
query($page: Int!, $query: String!) {
    getComicList(page: $page, query: $query) {
        offset
        limit
        total
        count
        results {
            id
            title
            description
            thumbnail
        }
    }
}
`

const GET_COMIC_PAGE=gql`
query($page: Int!) {
    getComicList(page: $page) {
        offset
        limit
        total
        count
        results {
            id
            title
            description
            thumbnail
        }
    }
}
`

const GET_SERIES = gql`
query($id: ID!) {
    getSeries(id: $id) {
        id
        title
        description
        thumbnail
        characters {
            id
            name
        }
        comics {
            id
            name
        }
    }
}
`;

const GET_SERIES_SEARCH = gql`
query($page: Int!, $query: String!) {
    getSeriesList(page: $page, query: $query) {
        offset
        limit
        total
        count
        results {
            id
            title
            description
            thumbnail
        }
    }
}
`

const GET_SERIES_PAGE=gql`
query($page: Int!) {
    getSeriesList(page: $page) {
        offset
        limit
        total
        count
        results {
            id
            title
            description
            thumbnail
        }
    }
}
`

export default {
    GET_CHARACTER_PAGE,
    GET_CHARACTER,
    GET_CHARACTER_SEARCH,
    GET_COMIC,
    GET_COMIC_SEARCH,
    GET_COMIC_PAGE,
    GET_SERIES,
    GET_SERIES_PAGE,
    GET_SERIES_SEARCH
};
