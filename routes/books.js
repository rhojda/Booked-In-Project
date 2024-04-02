const express = require('express'); // Include express
const router = express.Router(); // define the router

const Book = require('../models/book'); // importing book model
const Author = require('../models/author'); // importing author model
const Genre = require('../models/genre'); // importing genre model
const BookUser = require('../models/book_user');
const Comment = require('../models/comment');


router.get('/', function (req, res, next) {
    const books = Book.all
    res.render('books/index', { title: 'BookedIn || books', books: books });
});

router.get('/form', async (req, res, next) => { // form route added 
    res.render('books/form', { title: 'BookedIn || Books', authors: Author.all, genres: Genre.all });
});

router.get('/edit', async (req, res, next) => { // edit route added 
    let bookIndex = req.query.id;
    let book = Book.get(bookIndex);
    res.render('books/form', { title: 'BookedIn || Books', book: book, bookIndex: bookIndex, authors: Author.all, genres: Genre.all });
});

router.get('/show/:id', async (req, res, next) => { // show route added 
    let templateVars = {
        title: 'BookedIn || Books',
        book: Book.get(req.params.id),
        bookId: req.params.id,
        statuses: BookUser.statuses,
        comments: Comment.AllForBook(req.params.id)
    }
    if (templateVars.book.authorIds) {
        templateVars['authors'] = templateVars.book.authorIds.map((authorId) => Author.get(authorId))
    }
    if (templateVars.book.genreId) {
        templateVars['genre'] = Genre.get(templateVars.book.genreId);
    }
    if (req.session.currentUser) { //if we have a logged in user
        templateVars['bookUser'] = BookUser.get(req.params.id, req.session.currentUser.email); //get the book user based on the current book and user email
    }
    res.render('books/show', templateVars);
});


router.post('/upsert', async (req, res, next) => { // update route added 
    console.log('body: ' + JSON.stringify(req.body))
    Book.upsert(req.body);
    let createdOrupdated = req.body.id ? 'updated' : 'created';
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `the book has been ${createdOrupdated}!`,
    };
    res.redirect(303, '/books') //redirect back to the books index page
});


module.exports = router;
