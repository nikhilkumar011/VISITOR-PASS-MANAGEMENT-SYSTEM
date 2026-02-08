const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Dbconnection = require('./Dbconnection.js');
const app = express();

app.use(cors())
app.use('/uploads', express.static('uploads'))


app.use(express.json())
dotenv.config();
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

