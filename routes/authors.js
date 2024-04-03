const express = require('express'); // Include express
const router = express.Router(); // define the router
const Author = require('../models/author'); // importing author model

// Call the async function from the Author model to get all data and wait for it to complete
router.get('/', async (req, res, next) => {
    let authors = await Author.all();
    res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});

/*
Comment out or delete reference to the hard-coded authors array

router.get('/', function (req, res, next) {
    const authors = Author.all;
    res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});
*/

router.get('/form', async (req, res, next) => { // form route added 
    res.render('authors/form', { title: 'BookedIn || Authors' });
});

router.get('/edit', async (req, res, next) => { // edit route added 
    let authorIndex = req.query.id;
    let author = Author.get(authorIndex);
    res.render('authors/form', { title: 'BookedIn || Authors', author: author, authorIndex: authorIndex });
});

router.post('/upsert', async (req, res, next) => { // update route added 
    console.log('body: ' + JSON.stringify(req.body));
    Author.upsert(req.body);
    let createdOrupdated = req.body.id ? 'updated' : 'created';
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `the author has been ${createdOrupdated}!`,
    };
    res.redirect(303, '/authors'); //redirect back to the authors index page
});



module.exports = router;

