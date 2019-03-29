exports.validateNewAuthor = function(author) {
  const errors = []

  if(!author.FirstName) {
    errors.push("You need to enter a Firstname")
  }
  if(!author.LastName) {
    errors.push("You need to enter a Lastname")
  }

  return errors
}