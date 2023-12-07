const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    employee_Name: {
        required: true,
        type: Text
    },
    department: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema)