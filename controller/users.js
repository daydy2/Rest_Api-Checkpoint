const User = require("../models/User");

//Home
exports.getHome = (req, res, next) => {
  res.status(200).send("Welcome to REST-API Checkpoint page");
};

//GET :  RETURN ALL USERS
exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

//POST :  ADD A NEW USER TO THE DATABASE
exports.postNewUser = (req, res, next) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const hobbies = req.body.hobbies;

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    hobbies: hobbies,
  });
  newUser
    .save()
    .then((result) => {
      res.status(202).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

//PUT : EDIT A USER BY ID
exports.editAUser = (req, res, next) => {
  const userId = req.params.userId;
  const updateInfo = req.body.updateInfo;

  User.findOneAndUpdate(
    { _id: userId },
    { $set: { firstName: updateInfo } },
    { new: true }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

//DELETE : REMOVE A USER BY ID
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndDelete({ _id: userId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};
