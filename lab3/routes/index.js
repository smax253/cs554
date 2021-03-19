const axios = require('axios');
const redis = require('redis');

const client = redis.createClient();
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const configureRoutes = async (app) => {
    app.get('/show/:id', async (req, res) => {
        const id = req.params.id;
        if (!req.params.id || !Number.isInteger(+id) || +id <= 0) {
            return res.status(400).render('error', {
                title: 'Error',
                error: 'ID is not a positive integer',
            });
        }
        const showsSet = await client.hgetAsync('show', id);
        if (showsSet) {
            console.log(`Serving show id ${id} from cache`);
            return res.send(showsSet);
        }
        let apiResponse;
        try {
            apiResponse = await axios.get(
                `http://api.tvmaze.com/shows/${req.params.id}`
            );
        } catch (e) {
            return res.status(404).render('error', {
                title: 'Error',
                error: 'Movie with given ID not found.',
            });
        }

        const movieData = apiResponse.data;

        const parsedMovieData = {
            ...movieData,
            imageLink: movieData.image?.medium,
            rating: movieData.rating?.average,
        };
        return res.render(
            'show',
            {
                title: movieData.name,
                ...parsedMovieData,
            },
            async (err, html) => {
                const result = await client.hsetAsync('show', id, html);
                console.log(`Putting show id ${id} in redis cache: ${result}`);
                res.send(html);
            }
        );
    });
    app.post('/search', async (req, res) => {
        const searchTerm = req.body.searchTerm;
        if (
            !searchTerm ||
            typeof searchTerm !== 'string' ||
            !searchTerm.trim()
        ) {
            return res.status(400).render('error', {
                title: 'Error',
                error: 'Search term must be a non-empty string.',
            });
        }
        await client.zaddAsync('scores', 'INCR', 1, searchTerm);
        const cache = await client.hgetAsync('search_results', searchTerm);
        if (cache) {
            console.log(`Serving search result '${searchTerm}' from cache`);
            return res.send(cache);
        }
        const apiResponse = await axios.get(
            `http://api.tvmaze.com/search/shows?q=${searchTerm}`
        );
        const data = apiResponse.data.map(({ show }) => {
            return {
                title: show.name,
                link: `/show/${show.id}`,
            };
        });
        return await res.render(
            'shows_list',
            { title: 'All Shows', results: data },
            async (err, html) => {
                let result = await client.hsetAsync(
                    'search_results',
                    searchTerm,
                    html
                );
                console.log(
                    `Saved search results page of query '${searchTerm}' to cache: ${result}`
                );
                res.send(html);
            }
        );
    });
    app.get('/popularsearches', async (req, res) => {
        const result = await client.zrevrangeAsync('scores', 0, 9);
        return res.render('popular', {
            title: 'Popular searches',
            terms: result,
        });
    });
    app.get('/', async (req, res) => {
        const cache = await client.getAsync('all_shows');
        if (cache) {
            console.log('Loaded all_shows page from cache');
            return res.send(cache);
        }
        const apiResponse = await axios.get('http://api.tvmaze.com/shows');
        const data = apiResponse.data.map((entry) => {
            return {
                title: entry.name,
                link: `/show/${entry.id}`,
            };
        });
        return await res.render(
            'shows_list',
            { title: 'All Shows', results: data },
            async (err, html) => {
                let result = await client.setAsync('all_shows', html);
                console.log('Saved all_shows page in cache');
                res.send(html);
            }
        );
    });
    app.use('*', (req, res) => {
        res.status(404).render('error', {
            title: 'Error',
            error: 'Page not found!',
        });
    });
};

module.exports = configureRoutes;
