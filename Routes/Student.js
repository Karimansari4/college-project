const express = require('express')
const { getStudents, addStudent, updateStudent, deleteStudent } = require('../Controllers/Student')
const stRoute = express.Router()

stRoute.get('/getStudent', getStudents)

stRoute.post('/addStudent', addStudent)

stRoute.post('/updateStudent/:id', updateStudent)

stRoute.delete('/deleteStudent/:id', deleteStudent)

module.exports = stRoute