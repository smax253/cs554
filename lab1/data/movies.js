const { ObjectId } = require('mongodb');
const collections = require('../config/mongoCollections');
const {
    checkValidString,
    checkValidInfo,
    checkValidCast,
    checkValidRating,
    checkValidMovieFields,
} = require('../helpers');

const getAllMovies = async (skip = 0, take = 20) => {
    if (typeof skip !== 'number' || !Number.isInteger(skip) || skip < 0) {
        throw { error: 'skip must be a positive integer', statusCode: 400 };
    }
    if (
        typeof take !== 'number' ||
        !Number.isInteger(take) ||
        take < 0 ||
        take > 100
    ) {
        throw {
            error: 'take must be an integer between 0 and 100',
            statusCode: 400,
        };
    }
    const movies = await collections.movies();
    const allMovies = await movies.find({}).toArray();
    const result = [];
    for (let i = skip; i < skip + take && i < allMovies.length; i++) {
        result.push(allMovies[i]);
    }
    return {
        statusCode: 200,
        result,
    };
};

const getMovieByID = async (id) => {
    if (typeof id !== 'string')
        throw { error: 'ID must be a string', statusCode: 400 };
    let convertedID;
    try {
        convertedID = ObjectId(id);
    } catch (error) {
        throw {
            error: error,
            statusCode: 400,
        };
    }
    const movies = await collections.movies();
    const lookup = await movies.findOne({ _id: convertedID });
    if (!lookup)
        throw {
            error: 'Movie with the given ID not found',
            statusCode: 404,
        };
    else
        return {
            result: lookup,
            statusCode: 200,
        };
};

const createMovie = async ({ title, cast, info, plot, rating, ...rest }) => {
    if (!checkValidString(title))
        throw { error: 'title must be a string', statusCode: 400 };
    if (!checkValidString(plot))
        throw { error: 'plot must be a string', statusCode: 400 };
    if (!checkValidInfo(info))
        throw {
            error:
                'info must be an object with a director string and a year number',
            statusCode: 400,
        };
    if (!checkValidCast(cast))
        throw {
            error:
                'cast must be an array with objects with strings firstName and lastName',
            statusCode: 400,
        };
    if (!checkValidRating(rating))
        throw {
            error: 'rating must be a positive number',
            statusCode: 400,
        };
    const movieCollection = await collections.movies();
    const result = await movieCollection.insertOne({
        title,
        cast,
        info,
        plot,
        rating,
        comments: [],
    });
    return {
        statusCode: 201,
        result: result.ops[0],
    };
};

const updateMovie = async (
    id,
    { title, cast, info, plot, rating, ...rest }
) => {
    if (typeof id !== 'string')
        throw { error: 'ID must be a string', statusCode: 400 };
    let convertedID;
    try {
        convertedID = ObjectId(id);
    } catch (error) {
        throw { error: error, statusCode: 400 };
    }
    const movies = await collections.movies();
    const lookup = await movies.findOne({ _id: convertedID });
    if (!lookup)
        throw {
            error: 'Movie with the given ID not found',
            statusCode: 404,
        };
    checkValidMovieFields({ title, cast, info, plot, rating });
    const result = await movies.updateOne(
        { _id: convertedID },
        {
            $set: {
                title,
                cast,
                info,
                plot,
                rating,
            },
        }
    );
    if (result.error) {
        throw { error: result.error, statusCode: 500 };
    }
    return {
        statusCode: 200,
        result: await movies.findOne({ _id: convertedID }),
    };
};

const addComment = async (movieId, { commentname, commentbody }) => {
    if (typeof movieId !== 'string')
        throw { error: 'ID must be a string', statusCode: 400 };
    if (typeof commentname !== 'string' || !commentname.trim())
        throw { error: 'name must be a non-empty string', statusCode: 400 };
    if (typeof commentbody !== 'string' || !commentbody.trim())
        throw { error: 'body must be a non-empty string', statusCode: 400 };
    let convertedID;
    try {
        convertedID = ObjectId(movieId);
    } catch (error) {
        throw { error: error, statusCode: 400 };
    }
    const movies = await collections.movies();
    const lookup = await movies.findOne({ _id: convertedID });
    if (!lookup)
        throw {
            error: 'Movie with the given ID not found',
            statusCode: 404,
        };
    const comment = {
        _id: new ObjectId(),
        name: commentname,
        comment: commentbody,
    };
    const result = await movies.updateOne(
        { _id: convertedID },
        {
            $push: {
                comments: comment,
            },
        }
    );
    if (result.error) {
        throw { error: result.error, statusCode: 500 };
    }
    return {
        statusCode: 201,
        result: comment,
    };
};

const deleteComment = async (movieId, commentId) => {
    if (typeof movieId !== 'string' || typeof commentId != 'string')
        throw { error: 'IDs must be strings', statusCode: 400 };
    let convertedID, convertedCommentID;
    try {
        convertedID = ObjectId(movieId);
    } catch (error) {
        throw { error: error, statusCode: 400 };
    }
    try {
        convertedCommentID = ObjectId(commentId);
    } catch (error) {
        throw { error: error, statusCode: 400 };
    }
    const movies = await collections.movies();
    const lookup = await movies.findOne({ _id: convertedID });
    if (!lookup)
        throw {
            error: 'Movie with the given ID not found',
            statusCode: 404,
        };
    if (
        !lookup.comments.find(
            ({ _id }) => _id.toString() === convertedCommentID.toString()
        )
    ) {
        throw {
            statusCode: 404,
            error: 'Comment with given ID not found',
        };
    }
    lookup.comments = lookup.comments.filter(
        ({ _id }) => _id.toString() !== convertedCommentID.toString()
    );
    const result = await movies.updateOne(
        { _id: convertedID },
        {
            $set: { comments: lookup.comments },
        }
    );
    if (result.error) {
        throw { error: result.error, statusCode: 500 };
    } else
        return {
            statusCode: 200,
            result: await movies.findOne({ _id: convertedID }),
        };
};

module.exports = {
    getAllMovies,
    getMovieByID,
    createMovie,
    addComment,
    deleteComment,
    updateMovie,
};
