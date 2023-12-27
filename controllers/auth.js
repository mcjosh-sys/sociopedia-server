import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;


    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: req.file.filename,
      friends,
      location,
      occupation,
    });
    const saveUser = await newUser.save();

    const userWithoutPassword = Object.assign({}, saveUser.toObject());
    delete userWithoutPassword.password;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
      return res.status(500).json({error: error.message})
  }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        
        if (!user) return res.status(404).json("User does not exists!")
        
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) return res.status(400).json("Invalid credentials!")
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
        const { password: pass, ...others } = user;

        return res.status(200).json({token, user:others._doc})

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
