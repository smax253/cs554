const { ObjectID } = require('mongodb');
const {
    getAllMovies,
    getMovieByID,
    createMovie,
    updateMovie,
    addComment,
    deleteComment,
} = require('../data/movies');
const { checkValidInfo, checkValidMovieFields } = require('../helpers');

const Router = require('express').Router();

Router.get('/movies/:id', async (req, res) => {
    const id = req.params.id;
    try {
        ObjectID(id);
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
    try {
        const movieResult = await getMovieByID(id);
        return res.status(movieResult.statusCode).json(movieResult.result);
    } catch (error) {
        res.status(error.statusCode).json({
            error: error.error,
        });
    }
});

Router.get('/movies', async (req, res) => {
    let skip = 0,
        take = 20;
    if (req.query.skip !== undefined) {
        if (
            !Number.isInteger(+req.query.skip) ||
            +req.query.skip < 0 ||
            req.query.skip.length === 0
        )
            return res
                .status(400)
                .json({ error: 'skip must be a positive integer' });
        skip = +req.query.skip;
    }
    if (req.query.take !== undefined) {
        if (
            !Number.isInteger(+req.query.take) ||
            +req.query.take < 0 ||
            +req.query.take > 100 ||
            req.query.take.length === 0
        )
            return res
                .status(400)
                .json({ error: 'take must be an integer between 0 and 100.' });
        take = +req.query.take;
    }
    try {
        const result = await getAllMovies(skip, take);
        return res.status(result.statusCode).json(result.result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.error });
    }
});

Router.post('/movies', async (req, res) => {
    const body = req.body;
    try {
        checkValidMovieFields(body);
        const result = await createMovie(body);
        res.status(result.statusCode).json(result.result);
    } catch (error) {
        res.status(error.statusCode).json({ error: error.error });
    }
});

Router.put('/movies/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    let convertedId;
    try {
        convertedId = ObjectID(id);
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }

    try {
        await getMovieByID(id);
        const { title, plot, info, cast, rating, ...rest } = body;
        if (!title && !plot && !info && !cast && !rating) {
            return res.status(400).json({ error: 'No valid fields received' });
        }
        if (Object.keys(rest).length !== 0) {
            return res.status(400).json({ error: 'Invalid fields received' });
        }
        checkValidMovieFields(body);
        const result = await updateMovie(id, body);
        return res.status(result.statusCode).json(result.result);
    } catch (error) {
        return res.status(error.statusCode).json({ error: error.error });
    }
});

Router.patch('/movies/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    let convertedId;
    try {
        convertedId = ObjectID(id);
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }

    try {
        const originalMovie = (await getMovieByID(id)).result;
        const { title, plot, info, cast, rating, ...rest } = body;
        if (!title && !plot && !info && !cast && !rating) {
            return res.status(400).json({ error: 'No valid fields received' });
        }
        if (Object.keys(rest).length !== 0) {
            return res.status(400).json({ error: 'Invalid fields received' });
        }
        let mergedFields = {
            ...originalMovie,
            ...body,
        };
        mergedFields.info = {
            ...originalMovie.info,
            ...body.info,
        };
        checkValidMovieFields(mergedFields);
        const result = await updateMovie(id, mergedFields);
        return res.status(result.statusCode).json(result.result);
    } catch (error) {
        return res.status(error.statusCode).json({ error: error.error });
    }
});

Router.post('/movies/:movieId/comments', async (req, res) => {
    const movieId = req.params.movieId;
    const { name, body, ...rest } = req.body;
    let convertedId;

    if (Object.keys(rest).length !== 0) {
        return res.status(400).json({ error: 'Invalid fields received' });
    }
    if (typeof name !== 'string' || !name.trim())
        return res
            .status(400)
            .json({ error: 'name must be a non-empty string' });
    if (typeof body !== 'string' || !body.trim())
        return res
            .status(400)
            .json({ error: 'body must be a non-empty string' });
    try {
        convertedId = ObjectID(movieId);
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
    try {
        await getMovieByID(movieId);
        const result = await addComment(movieId, {
            commentname: name,
            commentbody: body,
        });
        res.status(result.statusCode).json(result.result);
    } catch (error) {
        res.status(error.statusCode).json({ error: error.error });
    }
});

Router.delete('/movies/:movieId/:commentId', async (req, res) => {
    const movieId = req.params.movieId;
    const commentId = req.params.commentId;
    let convertedMovieId, convertedCommentID;
    try {
        convertedMovieId = ObjectID(movieId);
    } catch (error) {
        return res
            .status(400)
            .json({ error: `Movie ID invalid: ${error.toString()}` });
    }
    try {
        convertedCommentID = ObjectID(commentId);
    } catch (error) {
        return res
            .status(400)
            .json({ error: `Comment ID invalid: ${error.toString()}` });
    }
    try {
        const movie = await getMovieByID(movieId);
        const comments = movie.result.comments;
        if (!comments.find(({ _id }) => _id.toString() === commentId)) {
            return res
                .status(404)
                .json({ error: 'Comment with given ID not found' });
        }
        const delResult = await deleteComment(movieId, commentId);
        res.status(delResult.statusCode).json(delResult.result);
    } catch (error) {
        res.status(error.statusCode).json({ error: error.error });
    }
});

module.exports = Router;
