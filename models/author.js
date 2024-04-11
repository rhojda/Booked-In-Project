const db = require('../database');

exports.all = async () => {
    // Get a db connection from the pool 
    const { rows } = await db.getPool().query("select * from authors order by id"); // query the authors table
    return db.camelize(rows);
}


exports.create = async (firstName, lastName) => {
    return db.getPool().query("INSERT INTO authors(first_name, last_name) VALUES($1, $2) RETURNING *", [firstName, lastName]);
}


exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from authors where id = $1", [id])
    return db.camelize(rows)[0]
}

exports.update = async (id, firstName, lastName) => {
    return db.getPool().query("UPDATE authors SET first_name = $1, last_name = $2 where id = $3 RETURNING *", [firstName, lastName, id]);
}

exports.upsert = async (author) => {
    if (author.id) {
        return exports.update(author.id, author.firstName, author.lastName)
    }
    return exports.create(author.firstName, author.lastName)
}

exports.allForBook = async (book) => {
    const { rows } = await db.getPool().query(`
      select authors.* from authors
      JOIN authors_books on authors_books.author_id = authors.id
      where authors_books.book_id = $1;`, [book.id]);
    return db.camelize(rows);
}

/* 
Comment out or delete references to the hard-coded authors array

const authors = [
    { firstName: "James", lastName: "S. A. Corey" },
    { firstName: "Craig", lastName: "Alanson" },
    { firstName: "Cixin", lastName: "Liu" },
];

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


exports.all = authors
*/
