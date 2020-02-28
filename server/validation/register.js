const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function  validateRegisterInput(data) {
    data.name = validText(data.name) ? data.name : "";
    data.username = validText(data.username) ? data.username : "";
    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";

    if (Validator.isEmpty(data.name)) {
        return { message: "Name field is required.", isValid: false };
    }
    
    if (Validator.isEmpty(data.username)) {
        return { message: "Username field is required.", isValid: false };
    }

    if (!Validator.isLength(data.username, { min: 4 })) {
        return { message: "Username must be at least 4 characters long.", isValid: false }
    }

    if (Validator.isEmpty(data.email)) {
        return { message: "Email field is required.", isValid: false };
    }

    if (!Validator.isEmail(data.email)) {
        return { message: "Please enter a valid email.", isValid: false };
    }

    if (Validator.isEmpty(data.password)) {
        return { message: "Password field is required", isValid: false };
    }

    if (!Validator.isLength(data.password, { min: 6 })) {
        return { message: "Password must be at least 6 characters long.", isValid: false };
    }

    return {
        message: "Successfully registered",
        isValid: true
    };
}