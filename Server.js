const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path")
require('dotenv').config();

const userController = require('./controller/users');


const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }))

router.get('/', userController.getAllUsers);
router.post('/add-user', userController.postNewUser);
router.put('/update-user', userController.editAUser);
router.delete('/delete', userController.deleteUser);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true },() => {
    console.log('Connected to Db')
    app.listen(process.env.PORT || 8000 )
})