const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
//req my middleware
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

//all of the posts
router.get("/", (req, res) => {
  // console.log("??????", res);
  Post.findAll({
    attributes: ["id", "title", "text", "date_created"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id", "date_created"],
        include: {
          User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//find individual posts
router.get("/id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "text", "date_created"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id", "date_created"], 
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
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a new post 
router.post("/", withAuth, (req, res) => {
  // console.log("WE ARE AT CREATE POST ROUTE")
  Post.create({
    title: req.body.title,
    text: req.body.text,
    user_id: req.body.user_id,
  })
    .then((postData) => res.json(postData))

    .catch((err) => {
      res.status(400).json(err);
    });
});

//update a post
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      text: req.body.text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found!!!" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//delete a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
