//Coordination of seeds files
const sequelize = require('../config/connection');

const userSeed = require('./userSeed');
const postSeed = require('./postSeed');
const commentSeed = require('./commentSeed');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
       
    await userSeed();
    console.log('users are SECCESSFULY seeded')

    await postSeed();
    console.log('posts are SECCESSFULY seeded')

    await commentSeed();
    console.log('comments are SECCESSFULY seeded')

    process.exit(0);
};

seedDatabase();

