module.exports = function(currentPage, pages) {

  const first = Math.max(1, currentPage-2)
  const last = Math.min(pages, currentPage+2)
  let pageIndexes = []

  for(i = first; i <= last; i++) {
    pageIndexes.push(i)
  }
  return pageIndexes

}