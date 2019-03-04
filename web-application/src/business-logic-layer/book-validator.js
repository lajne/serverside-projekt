exports.validateNewBook = function(isbn) {
  const errors = []

  if(isNaN(isbn)) {
    errors.push("ISBN should only contain digits")
  }

  return errors
}