exports.validateNewAuthor = function(author) {
  const errors = []

  if(!author.firstName) {
    errors.push("You need to enter a Firstname")
  }
  if(!author.lastName) {
    errors.push("You need to enter a Lastname")
  }

  return errors
}