module.exports = function(currentPage, pages) {

  const first = Math.max(1, currentPage-2)
  const last = Math.min(pages, currentPage+2)

  let pageIndexes = []

  if(currentPage > 3) {
    let index = (currentPage - 3)
    if((currentPage + 3) < pages) {
      for(index; index <= (currentPage + 3); index++) {
        pageIndexes.push({index: index})
      }
    } else {
      for(index; index <= pages; index++) {
        pageIndexes.push({index: index})
      }
    }
  } else {
    let index = 1
    let max = (currentPage + 3)
    if(1 < currentPage) {
      for(index; index < currentPage; index++) {
        pageIndexes.push({index: index})
      }
    }
    let i = currentPage
    for(i; i < max; i++) {
      pageIndexes.push({index: i})
    }
  }
  return pageIndexes
}