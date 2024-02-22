const express = require('express');
const Genre = require('../models/genre'); //Note: By convention we import these with an Uppercase first letter
const router = express.Router();

router.get('/', function (req, res, next) {
    const genres = Genre.all
    res.render('genres/index', { title: 'BookedIn || Genres', genres: genres });
});

router.get('/form', async (req, res, next) => {
    res.render('genres/form', { title: 'BookedIn || Genres' });
});

router.get('/edit', async (req, res, next) => {
    let genreIndex = req.query.id;
    let genre = Genre.get(genreIndex);
    // Passing the index from the router so that we know which genre to update
    res.render('genres/form', { title: 'BookedIn || Genres', genre: genre, genreIndex: genreIndex }); //help “hide” the implementation of our genre storage
});

//Submitting a form us done with the “post” method
router.post('/upsert', async (req, res, next) => { //allows us to pass more data (and more securely) to the request
    console.log('body: ' + JSON.stringify(req.body)); //Since `req.body` is an object, I have to first make it into a string so that it’s printable
    Genre.upsert(req.body);
    res.redirect(303, '/genres'); //choosing to redirect back to the genres index page.
});

module.exports = router;