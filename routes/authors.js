const express = require('express');
const router = express.Router();
const Author = require('../models/author'); //Note: By convention we import these with an Uppercase first letter

router.get('/', function (req, res, next) {
    const authors = Author.all
    res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});

router.get('/form', async (req, res, next) => {
    res.render('authors/form', { title: 'BookedIn || Authors' });
});

router.get('/edit', async (req, res, next) => {
    let authorIndex = req.query.id;
    let author = Author.get(authorIndex);
    // Passing the index from the router so that we know which author to update
    res.render('authors/form', { title: 'BookedIn || Authors', author: author, authorIndex: authorIndex }); //help “hide” the implementation of our author storage
});

//Submitting a form us done with the “post” method
router.post('/upsert', async (req, res, next) => { //allows us to pass more data (and more securely) to the request
    console.log('body: ' + JSON.stringify(req.body)); //Since `req.body` is an object, I have to first make it into a string so that it’s printable
    Author.upsert(req.body);
    res.redirect(303, '/authors'); //choosing to redirect back to the authors index page.
});



module.exports = router;

