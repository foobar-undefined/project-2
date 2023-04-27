const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn')

const commentsController = require('../controllers/comments');

router.post('/songs/:id/comments', ensureLoggedIn, commentsController.create);

router.get('/songs/:id',ensureLoggedIn, commentsController.edit)

// router.put('/songs/:id/',ensureLoggedIn, commentsController.update)

router.delete('/songs/:id/comments', ensureLoggedIn, commentsController.delete);


module.exports = router;