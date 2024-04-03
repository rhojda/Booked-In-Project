const db = require('../database');

exports.all = async () => {
    // Get a db connection from the pool 
    const { rows } = await db.getPool().query("select * from authors order by id"); // query the authors table
    return db.camelize(rows);
}

/* 
Comment out or delete references to the hard-coded authors array

const authors = [
    { firstName: "James", lastName: "S. A. Corey" },
    { firstName: "Craig", lastName: "Alanson" },
    { firstName: "Cixin", lastName: "Liu" },
];
*/

exports.add = (author) => { //pushing the author we received into our list of known authors
    authors.push(author);
}

exports.get = (idx) => {
    return authors[idx];
}

exports.update = (author) => {
    authors[author.id] = author;
}

exports.upsert = (author) => {
    if (author.id) {
        exports.update(author);
    } else {
        exports.add(author);
    }
}

/*
Comment out or delete references to the hard-coded authors array

exports.all = authors
*/
