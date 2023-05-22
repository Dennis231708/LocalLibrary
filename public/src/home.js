function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  const result = books.filter((book) => book.borrows[0].returned === false)
  return result.length
}


const sortTopFivePopularItems = (items, criteria, tally, authors) => {
  const allItemsCriteria = items.map((item) => item[criteria])
  const result = []
  allItemsCriteria.map((crit) => {
    const criteriaLocation = result.findIndex((element) => element.name === crit)
    const currentItemBorrows = items.find((item) => item[criteria] === crit).borrows.length
    if (criteriaLocation >= 0) {
      result[criteriaLocation].count = result[criteriaLocation].count + 1
    } else if (currentItemBorrows >= 1 && criteria === 'title') {
      result.push({ name: crit, count: currentItemBorrows })
    } else {
      result.push({ name: crit, count: tally })
    }
  })
  result.sort((genreA, genreB) => genreB.count - genreA.count)
  return result.slice(0, 5)
}

function getMostCommonGenres(books) {
  const result = sortTopFivePopularItems(books, "genre", 1)
  return result

}


function getMostPopularBooks(books) {
  const result = sortTopFivePopularItems(books, 'title')
  return result

}

function getMostPopularAuthors(books, authors) {
  const topAuthors = authors.map((author) => ({
    ...author,
    bookCount: books.filter((book) => book.authorId === author.id).length,
    borrowCount: books.filter((book) => book.authorId === author.id).reduce((acc, cur) => acc + cur.borrows.length, 0)
  }))
  topAuthors.sort((authorA, authorB) => authorB.borrowCount - authorA.borrowCount)
  const result = topAuthors.map((topAuthor) => {
    const firstName = topAuthor.name.first
    const lastName = topAuthor.name.last
    return { name: `${firstName} ${lastName}`, count: topAuthor.borrowCount }
  })
  return result.slice(0, 5)
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  sortTopFivePopularItems,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
