// 這個檔案專門存放資料庫的連線設定
// 讓 read.js 和 add.js 可以共用
require('dotenv').config(); //載入 .env
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};
// 匯出這個設定物件
module.exports = dbConfig;
