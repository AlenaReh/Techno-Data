const router = require('express').Router();
const { Post, User,  Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({

    })
});


//should use the ID from the session
router.get('', withAuth, (req, res) => {
    Post.findAll({

    })
});

//for user to be able to change/update their post
router.get('', withAuth, (req, res) => {
    Post.findeOne({

    })
});




module.exports = router;