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

// on= attach the event listner to mongoose connection database
// (error) => this is a arrow function that defines the action to be taken when the 'error' event occurs,by this it console the error by using "console.log(error)"
database.on('error', (error) => {
    console.log(error)
})

// "once" once method ensures that the event listener is executed only once for the 'connected' event. 
// () => this arrow function defines the action to be taken when the 'connected' event occurs.
// console.log('Database Connected'); by this action console the connected database by using "console.log"
database.once('connected', () => {
    console.log('Database Connected');
})

// express()= function provide by framework of node.js,, it returns a new instance of an Express application.
// const app=constant variable named "app",& assaign newly created express application to it.
// app= it is the variable that used to configure routes, middleware, and other features of the web application.
const app = express();

// middleware=software that acts as a bridge between an operating system or database and applications, especially on a network.
// express.json(): This is a middleware provided by the Express.js framework. 
// app.use method, it sets up middleware that parses incoming request bodies containing JSON data.
app.use(express.json());

// app.listen(3000, ...): method that call the express application('app') to start the server & make listen for incomming request.
// 3000= the port number which the server listen it.
// () => arrow function of the body,it logs a message to console by using "console.log" the message is thr string that include the text"Server Started at" and the number port 
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

// require('./routes/employeeroutes'): importing modules located in this './routes/employeeroutes' path.
//  const routes = importing a set of routes or functionalities from the 'employeeroutes' module
const routes = require('./routes/employeeroutes');

// app.use method in Express to specify middleware. 
// '/api':base path for set of api routes.
// routes: This is the variable that likely holds the router or middleware for handling specific API-related routes.
app.use('/api', routes)
