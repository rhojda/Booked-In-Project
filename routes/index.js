const express = require('express'); // Include express
const router = express.Router(); // define the router

router.get('/', function (req, res, next) {
    res.render('index', { title: 'BookedIn' });
});


module.exports = router; ////JS requires us to export what we want to use in other files. 
//You’ll see this in every file outside of the main file.
