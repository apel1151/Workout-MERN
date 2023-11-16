const express = require("express");
const router = express.Router();
const { createWorkout, getSingleWorkout, getAllWorkout } = require('../controller/WorkoutController');

// get all workouts
router.get('/', getAllWorkout)
// get a single workout
router.get('/:id', getSingleWorkout)
// adding a workout
router.post('/addWorkout', createWorkout)
// deleting a workout
router.delete('/:id', (req, res) =>{
    res.json({message: "deleting a workout"});
})
// editing a workout
router.patch('/:id', (req, res) =>{
    res.json({message: "editing a workout"})
})

module.exports = router;