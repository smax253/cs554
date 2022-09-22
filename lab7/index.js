const { ApolloServer, gql } = require('apollo-server');
const Query = require('./resolvers/query');

const typeDefs = gql`
    type Query {
        getCharacter(id: ID!): Character
        getCharacterList(page: Int!, query: String): CharacterList
        getComic(id: ID!): Comic
        getComicList(page: Int!, query: String): ComicList
        getSeries(id: ID!): Series
        getSeriesList(page: Int!, query: String): SeriesList
    }

    type Link {
        name: String!
        id: ID!
    }

    type Creator {
        name: String!
        role: String!
    }

    type Character {
        id: ID!
        name: String!
        description: String!
        thumbnail: String!
        comics: [Link]
        series: [Link]
    }

    type CharacterList {
        offset: Int!
        limit: Int!
        total: Int!
        count: Int!
        results: [Character]
    }

    type Comic {
        id: ID!
        title: String!
        description: String
        thumbnail: String!
        creators: [Creator]
        characters: [Link]
        series: Link
    }

    type ComicList {
        offset: Int!
        limit: Int!
        total: Int!
        count: Int!
        results: [Comic]
    }

    type Series {
        id: ID!
        title: String!
        description: String
        thumbnail: String!
        characters: [Link]
        comics: [Link]
    }

    type SeriesList {
        offset: Int!
        limit: Int!
        total: Int!
        count: Int!
        results: [Series]
    }
`;

const resolvers = {
    Query,
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
});
