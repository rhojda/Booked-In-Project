const genres = [
    { genre: "Science-Fiction" },
    { genre: "Fantasy" },
    { genre: "Horror" },
]

exports.add = (genre) => {
    genres.push(genre);
}

exports.all = genres;