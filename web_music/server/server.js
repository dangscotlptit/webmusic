const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

// ngoại lệ chưa bắt được
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message, err);
  

  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => {
  console.log('Kết nối database thành công');
});

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Hoạt động tại cổng ${process.env.PORT || 8080}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});