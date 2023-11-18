const User = require("../models/userModel");
const bcrypt =  require('bcrypt');
const validator = require('validator');

//login controller
const loginUser = async (req, res) =>{
   await res.json({message: "user login successfully"});
}

// signup controller
const signUpUser = async (req, res) => {
    const { email, password } = req.body;

    //validation email and password
    if(!email || !password){
       return res.status(400).json({error: "Please give email and password"});
    }
    if(!validator.isEmail(email)) {
        return res.status(400).json({error: "Email is not valid."});
    }
    if(!validator.isStrongPassword(password)) {
        return res.status(400).json({error: "Password is not strong enough"});
    }
  
    try {
      // Wait for the promise to resolve
      const exists = await User.findOne({ email });
  
      if (!exists) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
  
        // Wait for the user creation to complete
        const user = await User.create({ email, password: hash });
  
        res.status(200).json({ email, user });
      } else {
        res.status(200).json({ error: "Email already in use" });
      }
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = {loginUser, signUpUser};