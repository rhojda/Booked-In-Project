const authors = [
    { firstName: "James", lastName: "S. A. Corey" },
    { firstName: "Craig", lastName: "Alanson" },
    { firstName: "Cixin", lastName: "Liu" },
];

exports.upsert = (author) => {
    if (author.id) {
        exports.update(author);
    } else {
        exports.add(author);
    }
}

exports.add = (author) => { //We are pushing the author we received into our list of known authors
    authors.push(author);
}

exports.get = (idx) => {
    return authors[idx];
}

exports.update = (author) => {
    authors[author.id] = author;
}

exports.all = authors

