const books = [
    { title: "Leviathan Wakes", publishingYear: 2011 },
    { title: "Columbus Day", publishingYear: 2017 },
    { title: "The Three-Body Problem", publishingYear: 2008 },
]

exports.upsert = (book) => {
    if (book.id) {
        exports.update(book);
    } else {
        exports.add(book);
    }
}
exports.add = (book) => {
    books.push(book);
}

exports.get = (idx) => {
    return books[idx];
}

exports.update = (book) => {
    books[books.id] = book;
}

exports.all = books

