const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.gert('/', (req, res) => {
    Comment.findAll({})
})

router.post('/', withAuth, (req, res) => {

})

router.delete('/:id', withAuth, (req, res) => {
    
})

module.exports = router;