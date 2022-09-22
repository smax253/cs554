const { UserInputError } = require('apollo-server-errors');
const axios = require('axios');

const accessKey = '?client_id=Ykwsq4lwV-My5WBHJ5WnHw8o3tW-nBn_2YC4Rl-W3A8';
const redis = require('redis');
const client = redis.createClient();
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const Query = {
    unsplashImages: async (_, args) => {
        if (args.pageNum < 0) {
            throw new UserInputError('Invalid pageNum value');
        }
        const url = `https://api.unsplash.com/photos/${accessKey}&page=${args.pageNum}`;
        const { data } = await axios.get(url);
        const imagePosts = data.map((image) => {
            return {
                id: image.id,
                url: image.urls.regular,
                posterName: image.user.name,
                description: image.description,
                userPosted: false,
                binned: false,
            };
        });
        return imagePosts;
    },
    binnedImages: async (_, args) => {
        const result = await client.hgetallAsync('bin');
        console.log(result);

        const val = !!result
            ? Object.values(result)
                  .map((elem) => JSON.parse(elem))
                  .filter((elem) => !!elem)
            : [];
        console.log(val);
        return val;
    },
    userPostedImages: async (_, args) => {
        const result = await client.hgetallAsync('posted');
        console.log(result);
        return !!result
            ? Object.values(result)
                  .map((elem) => JSON.parse(elem))
                  .filter((elem) => !!elem)
            : [];
    },
};

module.exports = Query;
