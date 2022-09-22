const uuid = require('uuid');

const redis = require('redis');
const client = redis.createClient();
const bluebird = require('bluebird');
const { UserInputError } = require('apollo-server-errors');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const Mutation = {
    uploadImage: async (_, args) => {
        const imagePost = {
            id: uuid.v4(),
            url: args.url,
            posterName: args.posterName || '',
            description: args.description || '',
            userPosted: true,
            binned: false,
        };

        const result = await client.hsetAsync(
            'posted',
            imagePost.id,
            JSON.stringify(imagePost)
        );
        console.log(`Imagepost ${imagePost.id} added with result ${result}`);
        return imagePost;
    },
    updateImage: async (_, args) => {
        const id = args.id;
        const bin = args.binned;
        const updatedFields = {
            url: args.url,
            posterName: args.posterName,
            description: args.description,
            userPosted: args.userPosted,
            binned: args.binned,
        };
        Object.keys(updatedFields).forEach(
            (key) =>
                updatedFields[key] === undefined && delete updatedFields[key]
        );

        let binPost = await client.hgetAsync('bin', args.id);
        binPost = binPost && JSON.parse(binPost);
        let postedPost = await client.hgetAsync('posted', args.id);
        postedPost = postedPost && JSON.parse(postedPost);

        if (!binPost && !postedPost) {
            if (
                args.url === undefined ||
                args.posterName === undefined ||
                args.userPosted === undefined
            ) {
                throw new UserInputError(
                    'Required fields not defined for new image'
                );
            }
            const description = args.description || '';
            const userPosted = args.userPosted || false;
            const binned = args.binned || false;
            const post = {
                id: args.id,
                posterName: args.posterName,
                userPosted: args.userPosted,
                url: args.url,
                description,
                userPosted,
                binned,
            };
            if (userPosted) {
                const result = await client.hsetAsync(
                    'posted',
                    args.id,
                    JSON.stringify(post)
                );
                console.log(
                    `Imagepost with ID ${id} added to posted cache in update with result ${result}`
                );
            }
            if (binned) {
                const result = await client.hsetAsync(
                    'bin',
                    args.id,
                    JSON.stringify(post)
                );
                console.log(
                    `Imagepost with ID ${id} added to bin cache in update with result ${result}`
                );
            }

            return post;
        }
        let updatedPost;
        if (postedPost) {
            updatedPost = {
                ...postedPost,
                ...updatedFields,
            };
            const result = await client.hsetAsync(
                'posted',
                args.id,
                JSON.stringify(updatedPost)
            );
            console.log(
                `Imagepost with ID ${id} added to posted cache in update with result ${result}`
            );
        }
        console.log('binPost', binPost);
        if (binPost || bin === true) {
            if (binPost) {
                updatedPost = {
                    ...binPost,
                    ...updatedFields,
                };
            }

            if (bin === true) {
                const result = await client.hsetAsync(
                    'bin',
                    args.id,
                    JSON.stringify(updatedPost)
                );
                console.log(
                    `Imagepost with ID ${id} added to bin cache in update with result ${result}`
                );
            } else if (bin === false) {
                const result = await client.hdelAsync('bin', args.id);
                console.log(
                    `Imagepost with ID ${id} removed from bin cache in update with result ${result}`
                );
            }
        }

        return updatedPost;
    },
    deleteImage: async (_, args) => {
        let toBeDeletedPosted = await client.hgetAsync('posted', args.id);
        toBeDeletedPosted = toBeDeletedPosted && JSON.parse(toBeDeletedPosted);
        if (toBeDeletedPosted) {
            const result = await client.hdelAsync('posted', args.id);
            console.log(
                `Imagepost with ID ${args.id} deleted from posted cache in delete with result ${result}`
            );
        }
        let toBeDeletedBin = await client.hgetAsync('bin', args.id);
        toBeDeletedBin = toBeDeletedBin && JSON.parse(toBeDeletedBin);

        if (toBeDeletedBin) {
            const result = await client.hdelAsync('bin', args.id);
            console.log(
                `Imagepost with ID ${args.id} deleted from bin cache in delete with result ${result}`
            );
        }
        if (toBeDeletedPosted || toBeDeletedBin) {
            return toBeDeletedPosted || toBeDeletedBin;
        } else {
            throw new UserInputError(
                `ImagePost with ID ${args.id} does not exist in cache.`
            );
        }
    },
};

module.exports = Mutation;
