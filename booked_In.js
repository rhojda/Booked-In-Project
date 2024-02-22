const express = require('express'); // Include the express package
const app = express(); // call the express function to create the app
const port = 3000; // set the port of the web server

const bodyParser = require('body-parser'); //Wiring up body-parser

const { credentials } = require('./config')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const indexRouter = require('./routes/index'); // Include the new index.js route file
const authorsRouter = require('./routes/authors'); // Include the new authors.js route file
const booksRouter = require('./routes/books'); // Include the new books.js route file
const genresRouter = require('./routes/genres'); // Include the new genres.js route file
const usersRouter = require('./routes/users'); // Include the new routes.js route file

//register our express-handlebars 
var handlebars = require('express-handlebars').create({
    helpers: {
        eq: (v1, v2) => v1 == v2,
        ne: (v1, v2) => v1 != v2,
        lt: (v1, v2) => v1 < v2,
        gt: (v1, v2) => v1 > v2,
        lte: (v1, v2) => v1 <= v2,
        gte: (v1, v2) => v1 >= v2,
        and() {
            return Array.prototype.every.call(arguments, Boolean);
        },
        or() {
            return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
        },
        someId: (arr, id) => arr && arr.some(obj => obj.id == id),
        in: (arr, obj) => arr && arr.some(val => val == obj),
        dateStr: (v) => v && v.toLocaleDateString("en-US")
    }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//extra platform setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(credentials.cookieSecret));

app.use(expressSession({
    secret: credentials.cookieSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use((req, res, next) => {
    res.locals.flash = req.session.flash
    delete req.session.flash
    next()
});

app.use((req, res, next) => {
    res.locals.currentUser = req.session.currentUser
    next()
})

app.use('/', indexRouter); // attaching the router to the “/” url path
app.use('/authors', authorsRouter); // attaching the router to the “/authors” url path
app.use('/books', booksRouter); // attaching the router to the “/books” url path
app.use('/genres', genresRouter); // attaching the router to the “/genres” url path
app.use('/users', usersRouter); // attaching the router to the “/users” url path

/* GET home page. */
app.use('/', function (req, res, next) { // the / stands for the root route, or homepage
    res.send("<h1>Hello BookedIn</h1>");
});

// custom 404 page
app.use((req, res) => { // set the “default” page handler
    res.status(404) // set the response status code to 404
    res.send('<h1>404 - Not Found</h1>') // set the content of the response
})

// custom 500 page
app.use((err, req, res, next) => { // set the function of how to deal with errors
    console.error(err.message) // get the error message and write it to the console
    res.type('text/plain') // Set the response type to plain text
    res.status(500) // set the response status code to 500
    res.send('500 - Server Error') // set the content of the response
})

app.listen(port, () => console.log( // set our app up to listen to a given port
    `Express started on http://localhost:${port}; ` + // when listening has started execute this function
    `press Ctrl-C to terminate.`))