const db = require('../database')

exports.add = async (user) => {  //pushing the users we received into our list of known users
    const salt = createSalt(); // first create a new salt, so each user has a unique salt
    const encryptedPassword = encryptPassword(user.password, salt)
    return db.getPool()
        .query("INSERT INTO users(email, name, salt, password) VALUES($1, $2, $3, $4) RETURNING *",
            [user.email, user.name, salt, encryptedPassword])
}

exports.getByEmail = async (email) => {
    const { rows } = await db.getPool().query("select * from users where email = $1", [email])
    return db.camelize(rows)[0]
}

exports.login = async (login) => {
    let user = await exports.getByEmail(login.email); // we still start with lookup up the user based on email
    if (!user) { // if no user is found
        return null; // return null
    } // next encrypt the password provided during login 
    let encryptedPassword = encryptPassword(login.password, user.salt); // with the salt of the user
    if (user.password === encryptedPassword) {
        { // if the encrypted passwords match
            return user; // we can return the user
        }
        return null; // we return null
    }
}

/*
var crypto = require('crypto'); // use the build in cryptography functions from JS

const users = [
    { email: "rhojda@pratt.edu", name: "Rafaela Hojda", salt: "f837515c3aa6b07486568fb481cbc784", encryptedPassword: "7c4857da8274c077384bfa3b87157f7dd3f5d3ee555c8a16b16e906e68f11fe2" }
];

const createSalt = () => { // local function to create a salt
    return crypto.randomBytes(16).toString('hex'); // a salt is just some random text
}

const encryptPassword = (password, salt) => { // a function to encrypt a password given a salt
    return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex') //encrypt the Password
}

exports.all = users;
*/