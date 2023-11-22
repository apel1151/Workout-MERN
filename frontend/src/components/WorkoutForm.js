import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { WorkoutsContext } from "../context/WorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useContext(WorkoutsContext);
  const { user } = useContext(AuthContext);
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
    // checking if user doesn't login, he can't create workout
    if (!user) {
      setError('You must be logged in')
      return
    }
    const workout = { title, load, reps };
    const response = await fetch("/api/workouts/addWorkout", {
      method: "POST",
      body: JSON.stringify(workout),
      // here sending header as authorization of token to the backend middleware 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
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
      <h3>Add a New Exercise</h3>

      <label>Excercise Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (in kg):</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
