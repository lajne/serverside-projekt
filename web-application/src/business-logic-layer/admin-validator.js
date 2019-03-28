const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 15

exports.validateNewAccount = function(username){
    
    const errors = []

    if(!username){
        errors.push("Username is missing.")
    }else if(username.length < USERNAME_MIN_LENGTH || USERNAME_MAX_LENGTH < username.length){
        errors.push("Username must be between 3-15 characters.")
    }

    return errors
}