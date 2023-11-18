import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { WorkoutsContext } from "../context/WorkoutContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useContext(WorkoutsContext);
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workoutDetails">
      <div className="detailsInfo">
        <h4>{workout.title}</h4>
        <p>
          {" "}
          <strong>Load (kg): </strong> {workout.load}{" "}
        </p>
        <p>
          <strong>Reps: </strong> {workout.reps}{" "}
        </p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      </div>
      <div className="detailsButton">
        <MdDelete
          onClick={handleDelete}
          style={{ fontSize: "20px", color: "green", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default WorkoutDetails;
