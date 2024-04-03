const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');


router.get('/edit', async (req, res, next) => {
    let commentIndex = req.query.id;
    let comment = Comment.get(commentIndex);
    res.render('comments/form', { title: 'BookedIn || Comments', comment: comment, commentIndex: commentIndex });
});

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body));
    let bookId = req.body.bookId; // need to put bookId in end so knows where to pull from
    redirect = `/books/show/${bookId}`;
    Comment.upsert(req.body);
    let createdOrupdated = req.body.id ? 'updated' : 'created';
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `Your comment has been ${createdOrupdated}!`,
    };
    res.redirect(303, redirect);
});

module.exports = router;