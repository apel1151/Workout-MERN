import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";

const Home = () => {
  const { workouts, dispatch } = useContext(WorkoutsContext);
  //annonymous function

  useEffect(() => {
    const fetchWorkouts = async (req, res) => {
      const response = await fetch("/api/workouts");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, [dispatch]);


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
