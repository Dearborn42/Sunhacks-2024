import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import Account from '../models/Account.js';
dotenv.config();

export async function login(req, res) {
  const {email, password} = req.body;
  try {
    const user = await Account.findOne({email});
    if(!user)
      return res.status(400).json({success: false, message: "Wrong email or password"});
    if(!user.validPassword(password))
      return res.status(400).json({success: false, message: "Wrong email or password"});
    const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({success: false, message: error.message});
  }
}

export async function signup(req, res){
    try {
      console.log(req.body);
      const user = new Account(req.body);
      await user.validate();
      await user.save();
      const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1h" });
      return res.status(200).json({ success: true, token });
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}
