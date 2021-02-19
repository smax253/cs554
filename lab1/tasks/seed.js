const { ObjectID } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const mongoConnection = require('../config/mongoConnection');

const seedDb = async () => {
    const db = await mongoConnection();
    await db.dropDatabase();
    const movies = await mongoCollections.movies();
    await movies.insertOne({
        title: 'Spies in Disguise',
        cast: [
            { firstName: 'Will', lastName: 'Smith' },
            { firstName: 'Tom', lastName: 'Holland' },
            { firstName: 'Rashida', lastName: 'Jones' },
            { firstName: 'Ben', lastName: 'Mendelsohn' },
            { firstName: 'Reba', lastName: 'McEntire' },
        ],
        info: { director: 'Troy Quane', yearReleased: 2019 },
        plot:
            "Super spy Lance Sterling and scientist Walter Beckett are almost exact opposites. Lance is smooth, suave and debonair. Walter is not. But what Walter lacks in social skills he makes up for in smarts and invention, creating the awesome gadgets Lance uses on his epic missions. But when events take an unexpected turn, Walter and Lance suddenly have to rely on each other in a whole new way. And if this odd couple can't learn to work as a team, the whole world is in peril.",
        rating: 6.8,
        comments: [
            {
                _id: new ObjectID(),
                name: 'Erick',
                body: 'This movie was terrible!',
            },
            {
                _id: new ObjectID(),
                name: 'Michael',
                body: 'Amazing!',
            },
        ],
    });
    await movies.insertOne({
        title: 'Soul',
        cast: [
            { firstName: 'Jamie', lastName: 'Foxx' },
            { firstName: 'Tina', lastName: 'Fey' },
            { firstName: 'Graham', lastName: 'Norton' },
        ],
        info: { director: 'Pete Docter', yearReleased: 2020 },
        plot:
            "Joe is a middle-school band teacher whose life hasn't quite gone the way he expected. His true passion is jazz -- and he's good. But when he travels to another realm to help someone find their passion, he soon discovers what it means to have soul.",
        rating: 8.1,
        comments: [
            {
                _id: new ObjectID(),
                name: 'Patrick',
                body: 'This movie is great!',
            },
            {
                _id: new ObjectID(),
                name: 'Eric',
                body: 'This movie could have been better!',
            },
            {
                _id: new ObjectID(),
                name: 'Hamzah',
                body: 'This movie was super boring!',
            },
        ],
    });
    await movies.insertOne({
        title: 'The Maze Runner',
        cast: [
            { firstName: 'Dylan', lastName: "O'Brien" },
            { firstName: 'Kayla', lastName: 'Scodelario' },
            { firstName: 'Will', lastName: 'Poulter' },
        ],
        info: { director: 'Wes Ball', yearReleased: 2014 },
        plot:
            "Awakening in an elevator, remembering nothing of his past, Thomas emerges into a world of about thirty teenage boys, all without past memories, who have learned to survive under their own set of rules in a completely enclosed environment, subsisting on their own agriculture and supplies. With a new boy arriving every thirty days, the group has been in 'The Glade' for three years, trying to find a way to escape through the Maze that surrounds their living space (patrolled by cyborg monsters named 'Grievers'). They have begun to give up hope when a comatose girl arrives with a strange note, and their world begins to change with the boys dividing into two factions: those willing to risk their lives to escape and those wanting to hang onto what they've got and survive.",
        rating: 6.8,
        comments: [],
    });
    await movies.insertOne({
        title: 'The Maze Runner 2',
        cast: [
            { firstName: 'Dylan', lastName: "O'Brien" },
            { firstName: 'Kayla', lastName: 'Scodelario' },
            { firstName: 'Will', lastName: 'Poulter' },
        ],
        info: { director: 'Wes Ball', yearReleased: 2014 },
        plot:
            "Awakening in an elevator, remembering nothing of his past, Thomas emerges into a world of about thirty teenage boys, all without past memories, who have learned to survive under their own set of rules in a completely enclosed environment, subsisting on their own agriculture and supplies. With a new boy arriving every thirty days, the group has been in 'The Glade' for three years, trying to find a way to escape through the Maze that surrounds their living space (patrolled by cyborg monsters named 'Grievers'). They have begun to give up hope when a comatose girl arrives with a strange note, and their world begins to change with the boys dividing into two factions: those willing to risk their lives to escape and those wanting to hang onto what they've got and survive.",
        rating: 6.8,
        comments: [],
    });
    for (let i = 3; i < 150; i++) {
        await movies.insertOne({
            title: `The Maze Runner ${i}`,
            cast: [
                { firstName: 'Dylan', lastName: "O'Brien" },
                { firstName: 'Kayla', lastName: 'Scodelario' },
                { firstName: 'Will', lastName: 'Poulter' },
            ],
            info: { director: 'Wes Ball', yearReleased: 2014 },
            plot:
                "Awakening in an elevator, remembering nothing of his past, Thomas emerges into a world of about thirty teenage boys, all without past memories, who have learned to survive under their own set of rules in a completely enclosed environment, subsisting on their own agriculture and supplies. With a new boy arriving every thirty days, the group has been in 'The Glade' for three years, trying to find a way to escape through the Maze that surrounds their living space (patrolled by cyborg monsters named 'Grievers'). They have begun to give up hope when a comatose girl arrives with a strange note, and their world begins to change with the boys dividing into two factions: those willing to risk their lives to escape and those wanting to hang onto what they've got and survive.",
            rating: 6.8,
            comments: [],
        });
    }
    console.log('DB seeded!');
    await db.serverConfig.close();
};

seedDb();
