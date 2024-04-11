const db = require('../database')

exports.add = async (bookUser) => { //add is just like any other add we’ve done 
    return db.getPool()
        .query(`INSERT INTO
            books_users(book_id, user_id, read_status)
            VALUES($1, $2, $3) RETURNING *`,
            [bookUser.bookId, bookUser.userId, bookUser.status]);
}

// A method to update the status of a book
exports.update = async (bookUser) => {
    return await db.getPool()
        .query("UPDATE books_users SET read_status = $1 where id = $2 RETURNING *",
            [bookUser.readStatus, bookUser.id]);
}

exports.upsert = async (bookUser) => { //we should not rely on the index, but rather on the bookId and userId
    if (bookUser.id) {
        return exports.update(bookUser);
    } else {
        return exports.add(bookUser);
    }
}

exports.get = async (book, user) => {
    const { rows } = await db.getPool().query(`
    select *
    from books_users
    where book_id = $1 and user_id = $2`,
        [book.id, user.id])
    return db.camelize(rows)[0]
}

// A method to return all the books with status for a given user
exports.AllForUser = async (user) => {
    const { rows } = await db.getPool().query(`
    select books.title, books_users.read_status
    from books_users
    join books on books.id = books_users.book_id
    where user_id = $1;`,
        [user.id]);
    return db.camelize(rows);
}

/*
const books_users = [
    { bookId: "0", userEmail: "rhojda@pratt.edu", status: "Finished" },
    { bookId: "1", userEmail: "rhojdah@pratt.edu", status: "Reading" },
    { bookId: "2", userEmail: "rhojda@pratt.edu", status: "To-do" },
    { bookId: "3", userEmail: "rhojda@pratt.edu", status: "To-do" }
];

exports.statuses = [ //making the statuses universally available
    "To-do", "Reading", "Finished"
]
*/



// A method to return the status of a given book







