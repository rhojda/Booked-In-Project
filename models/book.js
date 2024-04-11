const db = require('../database')

exports.all = async () => {
    const { rows } = await db.getPool().query("select * from books order by id");
    return db.camelize(rows)
}

exports.add = async (book) => {
    const { rows } = await db.getPool()
        .query("INSERT INTO books(title, publishing_year, genre_id) VALUES($1, $2, $3) RETURNING *",
            [book.title, book.publishingYear, book.genreId]);
    let newBook = db.camelize(rows)[0]
    await addAuthorsToBook(newBook, book.authorIds)
    return newBook
}

exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from books where id = $1", [id])
    return db.camelize(rows)[0]
}

exports.update = async (book) => {
    const { rows } = await db.getPool()
        .query("UPDATE books SET title = $1, publishing_year = $2, genre_id = $3 where id = $4 RETURNING *",
            [book.title, book.publishingYear, book.genreId, book.id]);
    let newBook = db.camelize(rows)[0]
    await DeleteAuthorsForBook(newBook) // By first deleting the relevant authors_books records, we prevent accidental duplicates
    await addAuthorsToBook(newBook, book.authorIds)
    return newBook
}

exports.upsert = async (book) => {
    if (book.authorIds && !Array.isArray(book.authorIds)) {
        book.authorIds = [book.authorIds];
    }
    if (book.id) {
        return exports.update(book);
    } else {
        return exports.add(book);
    }
}

const addAuthorsToBook = async (book, authorIds) => {
    authorIds.forEach(async (authorId) => {
        await db.getPool().query(`
        INSERT INTO authors_books(author_id, book_id) values($1,$2)
        `, [authorId, book.id])
    })
}

const DeleteAuthorsForBook = async (book) => {
    db.getPool().query(`DELETE from authors_books where book_id = $1`, [book.id]);
}

/*
const books = [
    { title: "Leviathan Wakes", publishingYear: 2011, authorIds: ["0", "1"], genreId: "0" },
    { title: "Columbus Day", publishingYear: 2017, authorIds: ["0", "1"], genreId: "1" },
    { title: "The Three-Body Problem", publishingYear: 2008, authorIds: ["0", "1"] },
    { title: "Caliban’s War", publishingYear: 2012 },
    { title: "Abaddon’s Gate", publishingYear: 2013, genreId: "0", authorIds: ["0"] },
    { title: "Cibola Burn", publishingYear: 2014, genreId: "0", authorIds: ["0"] },
    { title: "Nemesis Games", publishingYear: 2015, genreId: "0", authorIds: ["0"] },
    { title: "Babylon’s Ashes", publishingYear: 2016, genreId: "0", authorIds: ["0"] },
    { title: "Persepolis Rising", publishingYear: 2017, genreId: "0", authorIds: ["0"] },
    { title: "Tiamat’s Wrath", publishingYear: 2018, genreId: "0", authorIds: ["0"] },
    { title: "Strange Dogs", publishingYear: 2017, genreId: "0", authorIds: ["0"] }
]


exports.add = (book) => { //pushing the book we received into our list of known books
    books.push(book);
}

exports.get = (idx) => {
    return books[idx];
}

exports.update = (book) => {
    books[book.id] = book;
}

exports.upsert = (book) => {
    if (book.authorIds && !Array.isArray(book.authorIds)) {
        book.authorIds = [book.authorIds];
    }
    if (book.id) {
        exports.update(book);
    } else {
        exports.add(book);
    }
}


exports.all = books
*/