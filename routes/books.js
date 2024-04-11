const express = require('express'); // Include express
const router = express.Router(); // define the router

const Book = require('../models/book'); // importing book model
const Author = require('../models/author'); // importing author model
const Genre = require('../models/genre'); // importing genre model
const BookUser = require('../models/book_user');
const Comment = require('../models/comment');


router.get('/', async (req, res, next) => {
    const books = await Book.all()
    res.render('books/index', { title: 'BookedIn || books', books: books, genres: await Genre.all() });
});

router.get('/form', async (req, res, next) => { // form route added 
    res.render('books/form', { title: 'BookedIn || Books', authors: await Author.all(), genres: await Genre.all() });
});

router.get('/edit', async (req, res, next) => { // edit route added 
    let bookId = req.query.id;
    let book = await Book.get(bookId);
    book.authorIds = (await Author.allForBook(book)).map(author => author.id);
    res.render('books/form', { title: 'BookedIn || Books', book: book, authors: await Author.all(), genres: await Genre.all() });
});

router.get('/show/:id', async (req, res, next) => {
    let templateVars = {
        title: 'BookedIn || Books',
        book: await Book.get(req.params.id),
        bookId: req.params.id,
        readStatus: BookUser.readStatus,
        comments: Comment.AllForBook(req.params.id)
    }
    templateVars.book.authors = await Author.allForBook(templateVars.book);
    if (templateVars.book.genreId) {
        templateVars['genre'] = await Genre.get(templateVars.book.genreId);
    }
    if (req.session.currentUser) {
        templateVars['bookUser'] = await BookUser.get(templateVars.book, req.session.currentUser);
    }
    res.render('books/show', templateVars);
});


router.post('/upsert', async (req, res, next) => { // update route added 
    console.log('body: ' + JSON.stringify(req.body))
    if (req.body.publishingYear == "") {
        req.session.flash = {
            type: 'danger',
            intro: 'failed!',
            message: `missing year!`,
        };
        res.redirect(303, '/books/form')
        return
    }
    await Book.upsert(req.body);
    let createdOrupdated = req.body.id ? 'updated' : 'created';
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `the book has been ${createdOrupdated}!`,
    };
    res.redirect(303, '/books') //redirect back to the books index page
});

module.exports = router;

/*
router.get('/show/:id', async (req, res, next) => {
    let templateVars = {
        title: 'BookedIn || Books',
        book: Book.get(req.params.id),
        bookId: req.params.id,
        statuses: BookUser.statuses,
        comments: Comment.AllForBook(req.params.id)
    }
    if (templateVars.book.authorIds) {
        templateVars['authors'] = templateVars.book.authorIds.map((authorId) => Author.get(authorId));
    }
    if (templateVars.book.genreId) {
        templateVars['genres'] = Genre.get(templateVars.book.genreId);
    }
    if (req.session.currentUser) {
        templateVars['bookUser'] = BookUser.get(req.params.id, req.session.currentUser.email);
    }
    res.render('books/show', templateVars);
});

*/