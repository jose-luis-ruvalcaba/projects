const mongoose = require('mongoose');
require('dotenv').config()

console.log(process.env.mongodbKey)

// useNewUrlParser
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// --------------------- BDD -----------------------------------------------------
mongoose.connect(process.env.mongodbKey,
  options,
  function (err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
  }
);


