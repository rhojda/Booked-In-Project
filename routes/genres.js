const express = require('express'); // Include express
const router = express.Router(); // define the router
const Genre = require('../models/genre'); // importing genre model

router.get('/', function (req, res, next) {
    const genres = Genre.all;
    res.render('genres/index', { title: 'BookedIn || Genres', genres: genres });
});

router.get('/form', async (req, res, next) => {  // form route added 
    res.render('genres/form', { title: 'BookedIn || Genres' });
});

router.get('/edit', async (req, res, next) => { // edit route added 
    let genreIndex = req.query.id;
    let genre = Genre.get(genreIndex);
    res.render('genres/form', { title: 'BookedIn || Genres', genre: genre, genreIndex: genreIndex });
});

router.post('/upsert', async (req, res, next) => { // update route added 
    console.log('body: ' + JSON.stringify(req.body));
    Genre.upsert(req.body);
    res.redirect(303, '/genres'); //redirect back to the genres index page
});


module.exports = router;