exports.validateNewBook = function(book) {
  const errors = []

  if(isNaN(book.ISBN) || !book.ISBN || book.ISBN <= 0) {
    errors.push("You need to enter an ISBN containing positive numbers only.")
  }
  
  if(book.Pages <= 0 || !book.Pages) {
    errors.push("You need to enter a positive number of pages")
  } 
  
  if(!book.Title) {
    errors.push("You need to enter a title.")
  }
  
  if(!book.SignId || book.SignId <= 0) {
    errors.push("You need to enter a SignId with a posotive value")
  }
  return errors
}