exports.validateNewBook = function(isbn) {
  const errors = []

  if(isNaN(isbn)) {
    console.log("validationerror on isbn: " + isbn)
    errors.push("ISBN should only contain digits")
  }

  return errors
}