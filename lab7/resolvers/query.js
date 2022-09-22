const { UserInputError } = require('apollo-server-errors');
const { default: axios } = require('axios');
const getApiUrl = require('../config/credentials');
const characterConverter = require('../converters/characters/characterConverter');
const checkValidNonNegativeInteger = require('../helpers/checkValidNum');
const checkValidString = require('../helpers/checkValidString');
const characterListConverter = require('../converters/characters/characterListConverter');
const comicConverter = require('../converters/comics/comicConverter');
const comicListConverter = require('../converters/comics/comicListConverter');
const seriesConverter = require('../converters/series/seriesConverter');
const seriesListConverter = require('../converters/series/seriesListConverter');

const redis = require('redis');
const client = redis.createClient();
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const Query = {
    getCharacter: async (_, args) => {
        const characterId = args.id;

        if (!checkValidString(characterId)) {
            throw new UserInputError(
                'Character id must be a non-empty string.'
            );
        }

        const redisQuery = await client.hgetAsync('char', characterId);
        if (redisQuery) {
            return JSON.parse(redisQuery);
        }

        const apiUrl = getApiUrl({
            baseUrl: `https://gateway.marvel.com:443/v1/public/characters/${characterId}`,
            args: {},
        });
        const { data } = await axios.get(apiUrl);

        const result = characterConverter(data);
        await client.hset('char', characterId, JSON.stringify(result));
        return result;
    },
    getCharacterList: async (_, args) => {
        const page = args.page;

        if (!checkValidNonNegativeInteger(page)) {
            throw new UserInputError('Page must be a non-negative integer.');
        }

        const redisQuery = await client.hgetAsync(
            'charList',
            JSON.stringify(args)
        );
        if (redisQuery) {
            return JSON.parse(redisQuery);
        }

        const pageNum = Number(page);
        const limitNum = Number(20);
        const skip = pageNum * limitNum;
        const apiUrl = getApiUrl({
            baseUrl: 'https://gateway.marvel.com:443/v1/public/characters',
            args: {
                limit: limitNum,
                offset: skip,
                nameStartsWith: args.query || undefined,
            },
        });

        const { data } = await axios.get(apiUrl);
        const result = characterListConverter(data);
        await client.hsetAsync(
            'charList',
            JSON.stringify(args),
            JSON.stringify(result)
        );
        return result;
    },
    getComic: async (_, args) => {
        const comicId = args.id;

        if (!checkValidString(comicId)) {
            throw TypeError('Comic id must be a string.');
        }
        const redisQuery = await client.hgetAsync('comic', comicId);
        if (redisQuery) {
            return JSON.parse(redisQuery);
        }
        const apiUrl = getApiUrl({
            baseUrl: `https://gateway.marvel.com:443/v1/public/comics/${comicId}`,
            args: {},
        });
        const { data } = await axios.get(apiUrl);
        const result = comicConverter(data);
        await client.hsetAsync('comic', comicId, JSON.stringify(result));
        return result;
    },
    getComicList: async (_, args) => {
        const page = args.page;

        if (!checkValidNonNegativeInteger(page)) {
            throw new UserInputError('Page must be a non-negative integer.');
        }
        const redisQuery = await client.hgetAsync(
            'comicList',
            JSON.stringify(args)
        );
        if (redisQuery) {
            return JSON.parse(redisQuery);
        }

        const pageNum = Number(page);
        const limitNum = Number(20);
        const skip = pageNum * limitNum;
        const apiUrl = getApiUrl({
            baseUrl: 'https://gateway.marvel.com:443/v1/public/comics',
            args: {
                limit: limitNum,
                offset: skip,
                titleStartsWith: args.query || undefined,
            },
        });

        const { data } = await axios.get(apiUrl);
        const result = comicListConverter(data);
        await client.hsetAsync(
            'comicList',
            JSON.stringify(args),
            JSON.stringify(result)
        );
        return result;
    },
    getSeries: async (_, args) => {
        const seriesId = args.id;
        if (!checkValidString(seriesId)) {
            throw TypeError('Series id must be a string.');
        }
        const redisQuery = await client.hgetAsync('series', seriesId);
        if (redisQuery) {
            return JSON.parse(redisQuery);
        }
        const apiUrl = getApiUrl({
            baseUrl: `https://gateway.marvel.com:443/v1/public/series/${seriesId}`,
            args: {},
        });
        const { data } = await axios.get(apiUrl);
        const result = seriesConverter(data);
        await client.hsetAsync('series', seriesId, JSON.stringify(result));
        return result;
    },
    getSeriesList: async (_, args) => {
        const page = args.page;

        if (!checkValidNonNegativeInteger(page)) {
            throw new UserInputError('Page must be a non-negative integer.');
        }

        const redisQuery = await client.hgetAsync(
            'seriesList',
            JSON.stringify(args)
        );
        if (redisQuery) {
            return JSON.parse(redisQuery);
        }
        const pageNum = Number(page);
        const limitNum = Number(20);
        const skip = pageNum * limitNum;
        const apiUrl = getApiUrl({
            baseUrl: 'https://gateway.marvel.com:443/v1/public/series',
            args: {
                limit: limitNum,
                offset: skip,
                titleStartsWith: args.query || undefined,
            },
        });

        const { data } = await axios.get(apiUrl);
        const result = seriesListConverter(data);
        await client.hsetAsync(
            'seriesList',
            JSON.stringify(args),
            JSON.stringify(result)
        );
        return result;
    },
};

module.exports = Query;
