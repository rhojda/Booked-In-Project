const books = [
    { title: "Leviathan Wakes", publishingYear: 2011, authorIds: ["0", "1"] },
    { title: "Columbus Day", publishingYear: 2017 },
    { title: "The Three-Body Problem", publishingYear: 2008 },
]

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



exports.add = (book) => { //We are pushing the book we received into our list of known books
    books.push(book);
}

exports.get = (idx) => {
    return books[idx];
}

exports.update = (book) => {
    books[book.id] = book;
}

exports.all = books
