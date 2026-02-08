const mongoose = require('mongoose');

function Dbconnection(){
  const DB_URL = process.env.MONGO_URI;

  mongoose.connect(DB_URL)

  const db = mongoose.connection;

  db.on("error",console.error.bind(console,"connection error"));
  db.once("open",()=>{
    console.log("DB Connected...")
  })
}

module.exports = Dbconnection;