const joivalidation = require('joi');

const joiSchema = joivalidation.object({
    username:joivalidation.string().pattern(new RegExp(/^[A-Za-z]+$/)).min(3).max(20).required(), 
    email:joivalidation.string().pattern(new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)).required(),
    phoneNumber:joivalidation.string().length(10).pattern(new RegExp(/^[0-9]+$/)).required(),
    password:joivalidation.string().min(6).required(),
})

module.exports={joiSchema:joiSchema};