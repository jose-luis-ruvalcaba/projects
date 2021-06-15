var express = require('express');
var router = express.Router();

var JourneyModel = require('../models/journeys.js');

var UserModel = require('../models/users.js');

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/homepage', function (req, res, next) {
  if (!req.session.user) {
    res.redirect('/')
  } else {
    var nameUserSession = req.session.user.firstName;
    res.render('homepage', { nameUserSession });
  }
});

router.post('/list-journeys', async function (req, res, next) {
  var origin = capitalizeFirstLetter(req.body.origin);
  var destination = capitalizeFirstLetter(req.body.destination);
  var tripSearch = await JourneyModel.find({ departure: origin, arrival: destination, date: req.body.date });
  console.log('tripsearch--------------------------', tripSearch);
  if (tripSearch.length == 0) {
    res.render('no-trains');
  } else {
    res.render('list-journeys', { tripSearch });
  }
});


router.get('/basket', async function (req, res, next) {
  var searchInUserTrips = req.session.user.trips.filter(search => search._id == req.query.id);
  console.log('search--------------', searchInUserTrips)
  if (searchInUserTrips.length == 0) {
    var selectedTrip = await JourneyModel.findOne({ _id: req.query.id });
    req.session.user.trips.push(selectedTrip);
    console.log('ajout trip de session', req.session.user.trips)
  }
  res.render('basket', { selectedTrip: req.session.user.trips });
});

router.get('/confirm', async function (req, res, next) {
  console.log('last trips--------', req.session.user.trips)
  var userToUpdate = await UserModel.findOne({ _id: req.session.user.id });
  for (i = 0; i < req.session.user.trips.length; i++) {
    userToUpdate.lasttrips.push(req.session.user.trips[i]._id)
  }
  await userToUpdate.save();
  console.log('updated user-----------', userToUpdate)
  req.session.user.trips = [];
  //res.redirect('/homepage'); 
});

router.get('/my-last-trips', async function (req, res, next) {

  var lastTripsUser = await UserModel.findOne({ _id: req.session.user.id })
    .populate('lasttrips')
    .exec()
  console.log('user last trips-----------', lastTripsUser);
  res.render('my-last-trips', { lastTripsUser });
});

router.get('/delete-trip', function (req, res, next) {
  req.session.user.trips.splice(req.query.position, 1)
  res.render('basket', { selectedTrip: req.session.user.trips });
});

module.exports = router;
