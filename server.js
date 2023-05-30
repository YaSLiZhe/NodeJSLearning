const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// Starting the server on port 3000
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on the port:${port}!`);
});
process.on('unhandledRejection', (error) => {
  // Handle the rejection
  console.log(error.name, error.message);
  console.log('UNHANDLED REJECTION!');
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  // Handle the uncaughtException
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION!');
  server.close(() => process.exit(1));
});
