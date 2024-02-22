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

