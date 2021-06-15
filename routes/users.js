var express = require('express');
var router = express.Router();

var UserModel = require('../models/users.js');

router.post('/sign-up', async function (req, res, next) {

  var searchUser = await UserModel.findOne({
    email: req.body.emailFromFront
  })

  if (!searchUser) {
    var newUser = new UserModel({
      lastName: req.body.lastNameFromFront,
      firstName: req.body.firstNameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    })

    var newUserSave = await newUser.save();

    req.session.user = {
      lastName: newUserSave.lastName,
      firstName: newUserSave.firstName,
      id: newUserSave._id,
      trips: []
    }

    console.log('req.session.user', req.session.user)
    if (req.session.user.lastName.length > 0 && req.session.user.firstName.length > 0) {
      res.redirect('/homepage')
    }
  } else {
    res.render('index')
  }
})

router.post('/sign-in', async function (req, res, next) {

  var searchUser = await UserModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront
  })

  if (searchUser) {
    req.session.user = {
      lastName: searchUser.lastName,
      firstName: searchUser.firstName,
      id: searchUser._id,
      trips: []
    }
    if (req.session.user.lastName.length > 0 && req.session.user.firstName.length > 0) {
      res.redirect('/homepage')
    }
  } else {
    res.render('index')
  }
})

router.get('/logout', function (req, res, next) {

  req.session.user = null;

  res.redirect('/')
});

module.exports = router;
