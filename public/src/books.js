function findAuthorById(authors, id) {
  const result = authors.find((author) => author.id === id)
  return result
}

function findBookById(books, id) {
  const result = books.find((book) => book.id === id)
  return result
}

function partitionBooksByBorrowedStatus(books) {
  let result = []
  const checkedOutBooks = books.filter((book) => book.borrows[0].returned === false)
  const availableBooks = books.filter((book) => book.borrows[0].returned === true)
  result.push(checkedOutBooks)
  result.push(availableBooks)
  return result
}

function getBorrowersForBook(book, accounts) {
  let borrowers = book.borrows
  const result = []
  borrowers.forEach((borrow) => {
    let userAccount = accounts.find((account) => account.id === borrow.id)
    userAccount.returned = borrow.returned
    result.push(userAccount)
  })
  return result.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
