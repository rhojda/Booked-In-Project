//Express receives a request and returns a response.
const express = require('express') // Include the express package
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index'); // Include the new index.js route file
const authorsRouter = require('./routes/authors');  // Include the new authors.js route file
const booksRouter = require('./routes/books'); // Include the new books.js route file
const genresRouter = require('./routes/genres'); // Include the new genres.js route file

const app = express() // call the express function to create the app
const port = 3000// set the port of the web server

//extra platform setup
app.use(bodyParser.urlencoded({ extended: true })); //Wiring body-parser

// view engine setup and register our `express-handlebars`
var handlebars = require('express-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Functions registered with app.use are applied in order of registration
/* GET home page. */
app.use('/', indexRouter); //the / stands for the root route, or homepage
app.use('/authors', authorsRouter); //authors root route
app.use('/books', booksRouter); //books root route
app.use('/genres', genresRouter); //genres root route

// custom 404 page
app.use((req, res) => { //set the “default” page handler
    res.status(404) //set the response status code to 404
    res.send('<h1>404 - Not Found</h1>') // set the content of the response
})

// custom 500 page
app.use((err, req, res, next) => { // set the function of how to deal with errors
    console.error(err.message) // get the error message and write it to the console
    res.type('text/plain') // Set the response type to plain text
    res.status(500) // set the response status code to 500
    res.send('500 - Server Error') // set the content of the response
})

app.listen(port, () => console.log( // set our app up to listen to a given port.
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))