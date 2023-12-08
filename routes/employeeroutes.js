// require('express')= import the express.js module,"const express" =declares a constant variable named express and assigns the imported Express.js module to it. 
// "Express.js" is a popular web application framework for Node.js that simplifies the process of building robust and scalable web applications.
const express = require('express');

// express.Router()= method to create new router.
// const router=constant variable named router.
// router variable can then be used to define routes, middleware, and other functionalities specific to a certain part of the application.
const router = express.Router()

// module.exports = router;: set the router in the model.exports object
module.exports = router;

// ..............................................................


//Post Method

// post method indicates that this route is specifically for handling POST requests.
// req: Represents the request object, containing information about the incoming HTTP request.
// res: Represents the response object, which is used to send a response back to the client.
// (req, res) => { res.send('Post API') }: This is the callback function that will be executed when a POST request is made to the '/post' endpoint. 

// router.post('/post', (req, res) => {
//     res.send('Post API')
// })

// //Get all Method

//  get method indicates that this route is specifically for handling GET requests.
// req: Represents the request object, containing information about the incoming HTTP request.
// res: Represents the response object, which is used to send a response back to the client.
// res.send('Get All API') call back function to send the text 'Get All API' as the response to the client making the GET request.

// router.get('/getAll', (req, res) => {
//     res.send('Get All API')
// })

// //Get by ID Method

// (req, res) => { res.send('Get by ID API') }: This is the callback function that will be executed when a GET request is made to the '/getOne/:id' endpoint.
// res.send('Get by ID API')callback function use to send the text 'Get by ID API' as the response to the client making the GET request.

// router.get('/getOne/:id', (req, res) => {
//     res.send('Get by ID API')
// })

// //Update by ID Method

// router.patch('/update/:id', ...): This line sets up a route for handling HTTP PATCH requests to the '/update/:id' endpoint.
// patch = this is update,  method indicates that this route is specifically for handling PATCH requests.
// res.send('Update by ID API') callback functionto send the text 'Update by ID API' as the response to the client making the PATCH request.

// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

// //Delete by ID Method

// delete method indicates that this route is specifically for handling DELETE requests.
// (req, res) => { res.send('Delete by ID API') }: This is the callback function that will be executed when a DELETE request is made to the '/delete/:id' endpoint.
// res.send('Delete by ID API') callback function to send the text 'Delete by ID API' as the response to the client making the DELETE request.

// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// })

// ........................................................................

// import model in route.js

//require('../Model/ModelEmployee')= it's importing the ModelEmployee module located in the '../Model' directory.
// const Model = ...: This line declares a constant variable named Model and assigns the functionality (exports) from the 'ModelEmployee' module to it.
// model=used in the script to interact with the features and methods defined in the 'ModelEmployee' module.
const Model = require('../Model/ModelEmployee');


// post= handle the post request
// route handler is defined as an asynchronous function using async.
// Model (assumed to be a Mongoose model)using the data extracted from the request body (req.body)it appears the properties

router.post('/post', async (req, res) => {
    const data = new Model({
        employeename: req.body.employeename,
        department: req.body.department,
        destination: req.body.destination,
        salary: req.body.salary
    })

    // try block, it attempts to save the data object to the database. 
    // await=is used to wait for the asynchronous operation to complete
    // If successful, the result is assigned to the dataToSave variable.
    // res.status(200).json(dataToSave)=If the save operation is successful, it responds with a JSON object containing the saved data and sets the HTTP status code to 200 (OK)
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    // catch= if the error occur when save the operation catch will excecute
    //  It responds with a JSON object containing an error message and sets the HTTP status code to 400 (Bad Request).
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// get all

// route handler is defined as an asynchronous function using async.
// get=handle the get requests
// router.get('/getAll', async (req, res) => { ... }): This line sets up a route for handling HTTP GET requests to the '/getAll' endpoint.
router.get('/getAll', async (req, res) => {
    // try block, it attempts to save the data object to the database. 
    // await=is used to wait for the asynchronous operation to complete
    // If successful, the result is assigned to the dataToSave variable.
    // res.status(200).json(dataToSave)=If the save operation is successful, it responds with a JSON object containing the saved data and sets the HTTP status code to 200 (OK)

    try{
        const data = await Model.find();
        res.json(data)
    }
    // catch= if the error occur when save the operation catch will excecute
    //  It responds with a JSON object containing an error message and sets the HTTP status code to 500  (Internal Server Error).
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// get DB on id
//Get by ID Method

// res.json(data): If the retrieval operation is successful, it responds with a JSON object containing the retrieved data.
// 
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    // catch= if the error occur when save the operation catch will excecute
    //  It responds with a JSON object containing an error message and sets the HTTP status code to 500  (Internal Server Error).
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})