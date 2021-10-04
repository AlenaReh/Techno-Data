const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await User.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // Serialize data so the template can read it
    const user = userData.map((user) => user.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("homepage", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", (req, res) => {
//   console.log("====reqsession====", req.session);
//   Post.findAll({
//     attributes: ["id", "title", "text", "date_created"],
//     include: [
//       {
//         model: Comment,
//         attributes: ["id", "text", "post_id", "user_id", "date_created"],
//         include: {
//           model: User,
//           attributes: ["name"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["name"],
//       },
//     ],
//   })
//     .then((postData) => {
//       const post = postData.map((post) => post.get({ plain: true }));
//       res.render("hompage", {
//         post,
//         logged_in: req.session.logged_in,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/login", (req, res) => {
  console.log("!!!we are at the LOGIN ROUTE");
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
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
      if (!postData) {
        res.status(404).json({ message: "No post with this id" });
        return;
      }
      const post = postData.get({ plain: true });
      res.render("userPost", {
        post,
        logged_in: req.session.logged_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a roter for users to be able to sign up
router.get("/signup", (req, res) => {
  console.log("=======SIGNUP");
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
