const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    manager: Boolean,
    
});

module.exports = userSchema;