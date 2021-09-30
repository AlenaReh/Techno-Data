const router = require('express').Router();
const { Post, User,  Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');


// Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//     try {
//       const userData = await User.findAll({
//         attributes: { exclude: ['password'] },
//       });
  
//       const users = userData.map((project) => project.get({ plain: true }));
  
//       res.render('homepage', {
//         users,
//         // Pass the logged in flag to the template
//         logged_in: req.session.logged_in,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

router.get('/', (req, res) => {
    console.log('====reqsession====', req.session);
})



router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// router.get('/post/:id', (req, res) => {

// })

//create a roter for users to be able to sign up





module.exports = router;