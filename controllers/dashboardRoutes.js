const router = require('express').Router();
const { Post, User,  Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id

        },
        attributes: [
            'id',
            'title',
            'text',
            'date_created'
        ],
        include:[
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment',
                    'user_id',
                    'post_id',
                    'date_created'
                ],
                include: {
                    model: User,
                    attributes: [
                        'name'
                    ]
                }
            },
            {
                model: User,
                attributes: [
                    'name'
                ]
            }
        ]

    })
    .then(postData => {
        const post = postData.map(post => post.get({ plain:true }));

        res.render('dashboard', {post, logged_in: true});

    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
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