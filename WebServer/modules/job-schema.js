const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let jobSchema = new Schema({
    docketNumber: Number,
    PONumber: String,
    quoteNumber: Number,
    bookTitle: String,
    postDate: Date,
    customerName: String,
    services: [String],
    isCash: Boolean,
    pageCount: Number,
    dueDate: Date,
    description: String
});

module.exports = jobSchema;