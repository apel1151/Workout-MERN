import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { WorkoutsContext } from "../context/WorkoutContext";

const Navbar = () => {
  const { dispatch, user } = useContext(AuthContext);
  const {dispatch: workoutDispatch} = useContext(WorkoutsContext);
  const handleLogout = (e) => {
    localStorage.removeItem("user");
    dispatch({ type: 'LOGOUT' });
    workoutDispatch({ type: 'SET_WORKOUTS', payload: null })
    console.log(user)
   
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Your Exercise Record</h1>
        </Link>
        <nav>
          {user && (
            <div className="logout">
              <span style={{color:"red"}}>{user.email}</span>
              <button onClick={handleLogout} className="btn">Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login" >Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
