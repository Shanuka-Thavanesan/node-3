// Mongoose is a MongoDB ODM i.e (Object database Modelling) that used to translate the code and its representation from MongoDB to the Node. js server.
// Object data model (ODM) is a term used to describe the process of storing information about an object.
const mongoose = require('mongoose');

//  new mongoose.Schema =creates a new Mongoose schema.
//  "name "= defines the field name, required: true: = specifies the documents must have a value for 'name', type: String: Specifies that the 'name' field should be of type String.
// as well as same explaination fromthe above explaination for age, but the type should be in number.
const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
})

// from the dataschema the mongoose model wich is named as 'Data' is created.
// mongoose.model=collection in the MongoDB database and provides an interface for interacting with the documents in that collection.
module.exports = mongoose.model('Data', dataSchema)