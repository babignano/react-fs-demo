const mongoose = require('mongoose');

const connectDb = () => {
  return mongoose.connect("mongodb://localhost:27017/react-demo");
};

module.exports = connectDb;
