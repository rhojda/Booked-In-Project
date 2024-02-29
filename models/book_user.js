const books_users = [
    { bookId: "0", userEmail: "rhojda@pratt.edu", status: "finished" },
    { bookId: "1", userEmail: "rhojdah@pratt.edu", status: "reading" },
    { bookId: "2", userEmail: "rhojda@pratt.edu", status: "todo" },
    { bookId: "3", userEmail: "rhojda@pratt.edu", status: "todo" }
];

exports.statuses = [ //making the statuses universally available
    "todo", "reading", "finished"
]

exports.add = (book_user) => { //add is just like any other add we’ve done 
    books_users.push(book_user);
}

exports.get = (bookId, userEmail) => {
    return books_users.find((book_user) => { //The find method will do exactly what we need
        return book_user.bookId == bookId && book_user.userEmail == userEmail;
    });
}

exports.AllForUser = (userEmail) => {
    return books_users.filter((book_user) => { //filter will return all the matching ones
        return book_user.userEmail == userEmail;
    });
}

exports.update = (idx, book_user) => {
    books_users[idx] = book_user; //The find method will do exactly what we need
}

exports.upsert = (book_user) => { //we should not rely on the index, but rather on the bookId and userId
    let idx = books_users.findIndex((bu) => { // we should find the book based on this info with findIndex
        //returns the index of the matching element
        return bu.bookId == book_user.bookId &&
            bu.userEmail == book_user.userEmail;
    });
    if (idx == -1) { //if no match is found, it returns -1
        exports.add(book_user); //that means we are adding a new book
    } else {
        exports.update(idx, book_user); //we can call update, but have to provide the index as well
    }
}
