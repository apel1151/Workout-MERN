import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React, { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { WorkoutsContext } from "../context/WorkoutContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useContext(WorkoutsContext);
  const { user } = useContext(AuthContext);

  const handleDelete = async (e) => {
    e.preventDefault();
    // checking user is logged in or not if not he can't delete workout
    if (!user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  const handleEdit = async (e) => {
    // console.log("clicked update")
    e.preventDefault();
    if(!user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
  });
  const json = await response.json();

  if (response.ok) {
    dispatch({type: "EDIT_WORKOUT", payload: json})
  }

};

  return (
    <div className="workoutDetails">
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          {" "}
          <strong>Load (kg): </strong> {workout.load}{" "}
        </p>
        <p>
          <strong>Reps: </strong> {workout.reps}{" "}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span>
          <MdDelete
            onClick={handleDelete}
            style={{ fontSize: "20px", color: "green", cursor: "pointer" }}
          />
          <MdEdit
            onClick={handleEdit}
            style={{ fontSize: "20px", color: "green", cursor: "pointer" }}
          />
        </span>
      </div>
    </div>
  );
};

export default WorkoutDetails;
