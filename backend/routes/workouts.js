const express = require("express");
const router = express.Router();
const { createWorkout, getSingleWorkout, getAllWorkout, deleteWorkout, updateWorkout} = require('../controller/WorkoutController');

// get all workouts
router.get('/', getAllWorkout)
// get a single workout
router.get('/:id', getSingleWorkout)
// adding a workout
router.post('/addWorkout', createWorkout)
// deleting a workout
router.delete('/:id', deleteWorkout)
// editing a workout
router.patch('/:id', updateWorkout)

module.exports = router;