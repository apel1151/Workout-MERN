const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');


// getting all workout
const getAllWorkout = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// getting a single workout
const getSingleWorkout = async (req, res) => {
    const {id} = req.params;
    console.log("id is", id);
    
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

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    console.log("delete id is", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: "No such workout" });
    }

    try {
        const workout = await Workout.findByIdAndDelete(id);
        if (!workout) {
            res.status(404).json({ message: "No such workout" });
        } else {
            res.status(202).json(workout);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//update a single workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No such workout" });
    }

    try {
        const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });

        if (!workout) {
            return res.status(404).json({ message: "No such workout" });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getAllWorkout , getSingleWorkout, createWorkout, deleteWorkout, updateWorkout};