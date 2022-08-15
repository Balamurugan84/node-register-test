const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const  bodyParser = require('body-parser')

const user = require('./routes/user_route');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(data=>{
    console.log("database connected")
}).catch(err=>{
    console.log(err.message)
   process.exit(1)
})

app.use(express.json());
// app.set('view engine');
app.use('/api/user/', user);


app.listen(5050, ()=>{
    console.log("server started...");
 })

 //http://localhost:5050