const express = require('express');
const Genre = require('../models/genre');
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
    res.render('genres/form', { title: 'BookedIn || Genres', genre: genre, genreIndex: genreIndex });
});

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body));
    Genre.upsert(req.body);
    res.redirect(303, '/genres');
});



module.exports = router;