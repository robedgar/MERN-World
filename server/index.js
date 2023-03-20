const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');

const application = express();
application.use(express.json());

env.config();

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('[Success] Mongo DB connected!');
  })
  .catch((err) => console.log('[Error] Mongo DB connection failed!'));

application.use('/api/pins', pinRoute);
application.use('/api/users', userRoute);

application.listen(7800, () => {
  console.log('[Success] Backend server started!');
});
