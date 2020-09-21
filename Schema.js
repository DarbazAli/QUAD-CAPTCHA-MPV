const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const personSchema = new Schema({
    email: String
})

exports.Person = mongoose.model('Person', personSchema)