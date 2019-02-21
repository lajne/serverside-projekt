exports.validateNewBook = function(isbn) {
  const errors = []

  if(typeof(isbn) != "number") {
    errors.push("ISBN should only contain digits")
  }

  return errors
}