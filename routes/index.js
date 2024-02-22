const express = require('express'); // Include express
const router = express.Router(); // define the router

router.get('/', function (req, res, next) { // this is like the app.use, but specifically for routing
    res.render('index', { title: 'BookedIn' }); // new template file and passing along a title variable
});


module.exports = router; ////JS requires us to export what we want to use in other files. 
//You’ll see this in every file outside of the main file.
