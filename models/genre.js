const genres = [
    { genre_title: "Science-Fiction" },
    { genre_title: "Fantasy" },
    { genre_title: "Horror" },
]

exports.add = (genre) => { //pushing the genre we received into our list of known genres
    genres.push(genre);
}

exports.get = (idx) => {
    return genres[idx];
}

exports.update = (genre) => {
    genres[genre.id] = genre;
}

exports.upsert = (genre) => {
    if (genre.id) {
        exports.update(genre);
    } else {
        exports.add(genre);
    }
}

exports.all = genres