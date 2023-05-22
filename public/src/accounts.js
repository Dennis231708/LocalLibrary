function findAccountById(accounts, id) {
  const result = accounts.find((account) => account.id === id)
  return result
}

function sortAccountsByLastName(accounts) {
  let sortedAccounts = accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1)
  return sortedAccounts
}

function getTotalNumberOfBorrows(account, books) {
  const { id } = account
  const result = books.filter((book) => book.borrows.find((users) => users.id === id))
  return result.length
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id
  const borrowedBooks = books.filter((book) => book.borrows.find((users) => users.id === accountId && users.returned === false))
  for (let i = 0; i < borrowedBooks.length; i++) {
    let currAuthorId = borrowedBooks[i].authorId
    borrowedBooks[i].author = authors.find((author) => author.id === currAuthorId)
  }
  return borrowedBooks
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
