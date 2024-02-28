const users = [
    { email: "rvanmech@pratt.edu", name: "Rik", password: "password" }
];

var crypto = require('crypto'); // use the build in cryptography functions from JS

const createSalt = () => { // local function to create a salt
    return crypto.randomBytes(16).toString('hex'); // a salt is just some random text
}

const encryptPassword = (password, salt) => { // a function to encrypt a password given a salt
    return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex') //encrypt the Password
}

exports.add = (user) => {  //pushing the users we received into our list of known users
    let salt = createSalt(); // first create a new salt, so each user has a unique salt
    let new_user = { // create a new user object
        email: user.email, // it uses the email and name from the passed in 
        name: user.name, //   user (from the form)
        salt: salt, // store the salt for this user (needed for login)
        encryptedPassword: encryptPassword(user.password, salt) // store the encrypted password
    }
    users.push(new_user); // store the new user
}


exports.getByEmail = (email) => {
    return users.find((user) => user.email === email);
}

exports.login = (login) => {
    let user = exports.getByEmail(login.email); // we still start with lookup up the user based on email
    if (!user) { // if no user is found
        return null; // return null
    } // next encrypt the password provided during login 
    let encryptedPassword = encryptPassword(login.password, user.salt); // with the salt of the user
    if (user.encryptedPassword === encryptedPassword) { // if the encrypted passwords match
        return user; // we can return the user
    }
    return null; // we return null
}

exports.all = users
