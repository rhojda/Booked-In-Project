const db = require('../database');

exports.all = async () => {
    // Get a db connection from the pool 
    const { rows } = await db.getPool().query("select * from genres order by id"); // query the genres table
    return db.camelize(rows);
}

/*
const genres = [
    { genre: "Sience Fiction" },
    { genre: "Fantasy" },
    { genre: "Romance" },
    { genre: "Mystery" },
    { genre: "Horror" }
];
*/

exports.add = (genre) => {
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

/*
exports.all = genres
*/