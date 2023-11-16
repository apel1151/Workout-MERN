const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');


// getting all workout
const getAllWorkout = async (req, res) => {
    try {
        const workouts = await Workout.find({});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// getting a single workout
const getSingleWorkout = async (req, res) => {
    const {id} = req.params;
    
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message: "No such workout"});
    }
    const workout = await Workout.findById(id);
    res.status(202).json(workout);
}


// creating new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;
    try {
        const workout = await Workout.create({title, reps, load});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { getAllWorkout , getSingleWorkout, createWorkout};