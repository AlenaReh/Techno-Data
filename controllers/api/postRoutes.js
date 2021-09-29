const router = require('express').Router();
const { Post, User,  Comment } = require('../../models');
//req my middleware
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

//all of the posts
router.get('/', (req, res) => {
  Post.findAll({

  })
})

//find individual posts
router.get('/id', (req, res) => {
  Post.findOne ({

  })
})

//create a new post
// router.post('/', withAuth, (req, res) => {
//   Post.create({
//     title: req.body.title,
//     text: req.body.text,
//     user_id: req.body.user_id 
//   })
//     .then(postData => res.json(postData))

//     .catch(err => {
//     res.status(400).json(err);
//   })
// });

//update a post
router.put('/:id', withAuth, (req, res) => {
  Post.update ({

  })
})
//delete a post
router.delete('/:id', withAuth, (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
    
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
