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
      res.render('dashboard', { posts, logged_in: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})
//should use the ID from the session
router.get("/viewpost", withAuth, (req, res) => {
  console.log("All Posts from dashboard ");
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "text", "date_created"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment",  "user_id", "date_created"],  ////"date_created"
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
      const post = postData.map((post) => post.get({ plain: true }));
      console.log("Post data on dashbaord", post);
      res.render("post", { post, logged_in: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//for user to be able to change/update their post
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findeOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "text", "date_created"],
    include: [
      {
        model: Comment,
        attributes: ["id", "text", "post_id", "user_id" ],//date_created
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
      res.render("editpost", {
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
