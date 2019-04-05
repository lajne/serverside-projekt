module.exports = function(key, salt) {
  console.log("pass. " + key + " ,salt: " + salt)
  const saltedKey = salt + key
  let charCodes = []

  for(let index = 0; index < saltedKey.length; index++) {
    charCodes.push(saltedKey.charCodeAt(index)) 
  }

  let sum = 1
  charCodes.map(x => {
    sum = sum * x
  })

  const hash = sum % 1000
  return hash
}