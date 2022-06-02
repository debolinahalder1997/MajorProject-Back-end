const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
const homeRouter = require('./Router/router')
const AdminRouter = require('./Router/Admin.router')
const fileupload = require('express-fileupload')
app.use(express.json());
// const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.emmyy.mongodb.net/${process.env.DB_NAME}`;

const dbURL=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vm0wv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});
app.use(fileupload({
    useTempFiles: true
}))
app.use(cors());




app.set('view engine', 'ejs');
app.set('views', 'View');
app.use(homeRouter)
app.use(AdminRouter)
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    //Promise sucess status
    if (result) {
        app.listen(process.env.PORT || 3500, () => {
            console.log("server running");
        })
    }
    else {
        console.log("Database not setup")
    }
}).catch((err) => {
    //Promise failure status
    console.log(err);
})