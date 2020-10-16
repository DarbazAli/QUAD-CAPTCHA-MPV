import mongoose from 'mongoose'
const { Schema } = mongoose

const personSchema = new Schema({
    email: String,
})

const Person = mongoose.model('Person', personSchema)
export default Person
