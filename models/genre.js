const genres = [
    { genre_title: "Science-Fiction" },
    { genre_title: "Fantasy" },
    { genre_title: "Horror" },
]

exports.upsert = (genre) => {
    if (genre.id) {
        exports.update(genre);
    } else {
        exports.add(genre);
    }
}

exports.add = (genre) => {
    genres.push(genre);
}

exports.get = (idx) => {
    return genres[idx];
}

exports.update = (genre) => {
    genres[genre.id] = genre;
}

exports.all = genres