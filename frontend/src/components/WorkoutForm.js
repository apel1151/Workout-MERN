import React, { useEffect, useState } from "react";
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useContext } from 'react';
import { WorkoutsContext } from "../context/WorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useContext(WorkoutsContext);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

// removing error message after a while
  useEffect(() => {
    if (message || error) {
      const timeoutId = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [message, error]);

// create a new workout
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch("/api/workouts/addWorkout", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError("Please fill all the information");
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      setMessage("Workout added successfully");
      console.log("new workout added", json);
    }


  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></input>

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      ></input>

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      ></input>

      <button>Add Workout</button>
      {message && <div style={{color: "green", marginTop: "15px"}}>{message}</div>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
