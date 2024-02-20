const books = [
    { title: "Leviathan Wakes", publishingYear: 2011 },
    { title: "Columbus Day", publishingYear: 2017 },
    { title: "The Three-Body Problem", publishingYear: 2008 },
]

exports.add = (book) => {
    books.push(book);
}

exports.all = books