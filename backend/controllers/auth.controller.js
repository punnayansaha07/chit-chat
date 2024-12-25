import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmpassword, gender } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exits" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(password, salt);



    const boyprofiledp ="https://avatar.iran.liara.run/public/boy?username=${username}";
    const girlprofiledp = "https://avatar.iran.liara.run/public/girl?username=${username}";
    const newUser = new User({
        fullname,
        username,
        password:hashedpassword,
        gender,
        profiledp: gender === 'male' ? boyprofiledp : girlprofiledp
    })
    if (password.length < 6) {
        return res.status(400).send('Password must be at least 6 characters long');
    }
    if(newUser){ 
        // generate jwt tokens
         generateTokenAndSetCookie(newUser._id,res);
    await newUser.save();
    res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username : newUser.username,
        gender : newUser.gender,
        profiledp : newUser.profiledp
    })}
    else{
        res.status(400).json({error: "Invalid user data "});
    }
  } catch (error) {
    console.log("error in sign up",error.message);
    res.status(500).json({error:"Internal server error"});
  }
};

export const login = async (req, res) => {
    try {
         const {username, password} = req.body;
          const user = await User.findOne({username});
          const isPasswordCorrect = bcrypt.compare(password,user?.password || "");
          if(!user || !isPasswordCorrect){
            return res.status(400).json({error : "Invalid password or username"})
          }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username : user.username,
            gender : user.gender,
            profiledp : user.profiledp
        });


    } catch (error) {
        console.log("error in log in",error.message);
    res.status(500).json({error:"Internal server error"});
    }
};

export const logout = (req, res) => {
  try {
     res.cookie("jwt","",{
        maxAge : 0
     });
     res.status(200).json({message : "Logged out successfully"});
  } catch (error) {
    console.log("error in log out",error.message);
    res.status(500).json({error:"Internal server error"});
  }
};
