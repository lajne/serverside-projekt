exports.validateNewAuthor = function(author) {
  const errors = []

  if(!author.Firstname) {
    errors.push("You need to enter a Firstname")
  }
  if(!author.Lastname) {
    errors.push("You need to enter a Lastname")
  }

  return errors
}