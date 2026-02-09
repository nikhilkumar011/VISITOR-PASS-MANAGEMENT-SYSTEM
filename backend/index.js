const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Dbconnection = require('./Dbconnection.js');
const app = express();
const fs = require("fs");
const path = require("path");


const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Uploads folder created:", uploadDir);
}

const pdfDir = path.join(__dirname, "../pdfs");
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
  console.log("PDFs folder created:", pdfDir);
}
app.use(cors({
  origin: "https://visitorpassmanagementsystem-taupe.vercel.app",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true 
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(express.json())
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT || 3000;

Dbconnection();

//Routers
const user = require('./routes/userRoute.js')
app.use('/user',user);

const visitor = require('./routes/visitorRoute.js')
app.use('/visitordashboard',visitor)



app.get('/ping',(req,res)=>{
    res.send('pong');
})

app.listen(PORT,()=>{
    console.log(`up and running at http://localhost:${PORT}`)
})

