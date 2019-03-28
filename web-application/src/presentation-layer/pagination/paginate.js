module.exports = function(currentPage, pages, searchTerm) {

  const first = Math.max(1, currentPage-2)
  const last = Math.min(pages, currentPage+2)
  let urlAttributes = []

  for(i = first; i <= last; i++) {
    urlAttributes.push({ searchTerm: searchTerm, pageIndex: i })
  }
  return urlAttributes

}