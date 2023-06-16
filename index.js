require('dotenv').config();

const dbConnection = require("./config/DB")
const cors = require("cors")
const routes = require('./routes/routes')
const express = require("express")
const app = express()




// database start
dbConnection()


//middleware
app.use(express.json())
app.use(cors())


//routes
app.use('/api',routes)


app.listen(5000,()=>{
  console.log("server is running on ", 5000);
})









