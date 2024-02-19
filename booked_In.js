const express = require('express') // Include the express package
const app = express() // call the express function to create the app
const port = 3000 // set the port of the web server

// Connecting the router 
const indexRouter = require('./routes/index'); // Include the new index.js route file
app.use('/', indexRouter); // attaching the router to the “/” url path

const authorsRouter = require('./routes/authors');
app.use('/authors', authorsRouter);

const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

var handlebars = require('express-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/* GET home page. */
app.use('/', function (req, res, next) { // the / stands for the root route, or homepage
    res.send("<h1>Hello BookedIn</h1>");
});

// custom 404 page
// App.use will “register” your function with the application, so it knows how and when to use your 
//function for a request
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

app.listen(port, () => console.log( // set our app up to listen to a given port.
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`)) // when listening has started execute this function that writes to the console

