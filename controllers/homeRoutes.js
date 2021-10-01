const router = require('express').Router();
const { Post, User,  Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');


// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
      });
  
      const users = userData.map((project) => project.get({ plain: true }));
  
      res.render('homepage', {
        users,
        // Pass the logged in flag to the template
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/', (req, res) => {
    // console.log('====reqsession====', req.session);
    res.render('homepage'); 
})



router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'date_created',
      'post'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
  
  .then (postData => {
    if (!postData) {
    res.status(404).json({ message: 'No post with this id' });
    return;
  }
  const post = postData.get ({ plain: true});
  res.render('userPost', {
    post,
    logged_in: req.session.logged_in
  });
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
})
});

//create a roter for users to be able to sign up
router.get('/signup', (req,res) =>{
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup'); 
})





module.exports = router;