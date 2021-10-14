const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    //uses data from session
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "text", "date_created"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "user_id", "post_id", "date_created"], 
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => posts.get({ plain: true }));

      res.render("dashboard", { posts, logged_in: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//new post router
router.get('/newpost/', withAuth, (req,res) =>{
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
    .then(postData => {
      // serialize data before passing to template
      const posts = postData.map(post => post.get({ plain: true }));
      res.render('newpost', { posts, logged_in: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

//for user to be able to change/update their post
router.get("/edit/post/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "text", "date_created"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id", "date_created" ],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found!" });
        return;
      }
      const post = postData.get({ plain: true });
      res.render("edit", {
        post,
        logged_in: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
