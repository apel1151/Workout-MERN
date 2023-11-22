import { useContext, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { AuthContext } from "../context/AuthContext";
import { WorkoutsContext } from "../context/WorkoutContext";

const Home = () => {
  const { workouts, dispatch } = useContext(WorkoutsContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchWorkouts = async (req, res) => {
      const response = await fetch("/api/workouts", {
        // here sending header as authorization of token to the backend middleware 
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    //checking if user is there then he will get all the workouts
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
