// dotenv is a module(helps to load environment variables from a .env file into the Node.js environment.),require=import, here import the dotenv module. 
// .config(): This is a method call on the dotenv module. 
require('dotenv').config();

// require('express')= import the express.js module,"const express" =declares a constant variable named express and assigns the imported Express.js module to it. 
// "Express.js" is a popular web application framework for Node.js that simplifies the process of building robust and scalable web applications. 
const express = require('express');
// Mongoose is a MongoDB ODM i.e (Object database Modelling) that used to translate the code and its representation from MongoDB to the Node. js server.
// Object data model (ODM) is a term used to describe the process of storing information about an object.  
const mongoose = require('mongoose');
// process.env is an object that holds the values of environment variables.
//DATABASE_URL= It is commonly used to store the connection string for a database, such as MongoDB.
// const mongoString=declares a constant variable named mongoString and assigns the value of the DATABASE_URL environment variable to it.
// mongoString=connection string that contains information about how to connect to a database.
const mongoString = process.env.DATABASE_URL;

// mongoose.connect= method provide by Monggode library for connect to MongoDB.
// mongoString is assumed to be a variable holding the connection string.
mongoose.connect(mongoString);
//mongoose.connection= active connection to the MongoDB database
//const database=declares a constant variable named database and assigns the Mongoose connection object to it. 
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
const routes = require('./routes/routes');


app.use('/api', routes)
