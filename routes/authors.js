const express = require('express'); // Include express
const router = express.Router(); // define the router
const Author = require('../models/author'); // importing author model

// Call the async function from the Author model to get all data and wait for it to complete
router.get('/', async (req, res, next) => {
    let authors = await Author.all();
    res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});


router.get('/form', async (req, res, next) => {
    let templateVars = { title: 'BookedIn || Authors' }
    if (req.query.id) {
        let author = await Author.get(req.query.id)
        if (author) { templateVars['author'] = author }
    }
    res.render('authors/form', templateVars);
});

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    await Author.upsert(req.body);
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'the author has been created!',
    };
    res.redirect(303, '/authors')
});

module.exports = router;

/*
Comment out or delete reference to the hard-coded authors array

router.get('/', function (req, res, next) {
    const authors = Author.all;
    res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
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


router.get('/edit', async (req, res, next) => { // edit route added 
    let authorIndex = req.query.id;
    let author = Author.get(authorIndex);
    res.render('authors/form', { title: 'BookedIn || Authors', author: author, authorIndex: authorIndex });
});
*/
