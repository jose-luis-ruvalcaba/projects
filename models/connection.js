const mongoose = require('mongoose');

// useNewUrlParser
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// --------------------- BDD -----------------------------------------------------
mongoose.connect('mongodb+srv://admin:test@cluster0.ibhnn.mongodb.net/Ticetac?retryWrites=true&w=majority',
  options,
  function (err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
  }
);

