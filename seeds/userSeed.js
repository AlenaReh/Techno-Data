const { User } = require('../models');

const userData = [
    {   
        name: "Test",
        email: "test@test.com",
        password: "password123"
    }
]


const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;