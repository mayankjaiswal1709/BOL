const express = require("express")
require('dotenv').config()
require("./models/config")
const router = require('./routes/mainRoutes')
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.use("/",router);

app.listen(process.env.PORT,(req, res)=>{
    console.log(`Server is running on Port ${process.env.PORT}`);
})
