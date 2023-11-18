const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose")

// creating express app
const app =  express();

//middlewares for sending post request. cause it has body
app.use(express.json());

// api request for getting all workouts
app.use('/api/workouts', require("./routes/workouts"));
// api rquest for getting singel workout
app.use('/api/workouts', require("./routes/workouts"));
// api request for adding a workout
app.use('/api/workouts', require("./routes/workouts"));
// api request for deleting a workout
app.use('/api/workouts', require("./routes/workouts"));
//api request for user login and signup
app.use('/api/user', require("./routes/user"));


app.listen(process.env.PORT , () => {
    console.log("Port is listening at-" , process.env.PORT);
})

mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database connected succesfully");
        })
        .catch((error) =>{
            console.log(error);
        })