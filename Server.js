const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path")
require('dotenv').config();

const userController = require('./controller/users');


const app = express();

app.use(bodyParser.json())

app.get('/', userController.getHome);
app.get('/users', userController.getAllUsers);
app.post('/add-user', userController.postNewUser);
app.put('/update-user/:userId', userController.editAUser);
app.delete('/delete/:userId', userController.deleteUser);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true },() => {
    console.log('Connected to Db')
    app.listen(process.env.PORT || 8000 )
})