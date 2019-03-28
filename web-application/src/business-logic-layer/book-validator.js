exports.validateNewBook = function(book) {
  const errors = []

  if(isNaN(book.isbn) || !book.isbn || book.isbn <= 0) {
    errors.push("You need to enter an ISBN containing positive numbers only.")
  }
  
  if(book.pages <= 0 || !book.pages) {
    errors.push("You need to enter a positive number of pages")
  } 
  
  if(!book.title) {
    errors.push("You need to enter a title.")
  }
  
  if(!book.signId || book.signId <= 0) {
    errors.push("You need to enter a SignId with a posotive value")
  }
  return errors
}