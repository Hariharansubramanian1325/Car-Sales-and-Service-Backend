import { Request, Response } from "express";
import User, { IUser } from './schema';
const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
console.log(req.body)
    // Search for a user with the provided username and password
    const user = await User.findOne({ username:username, password:password });

    if (user) {
      // User with matching credentials found
      res.status(200).json({ message: 'Login successful', usertype:user.user_type,id:user.user_id });
    } else {
      // No user found with matching credentials
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default login;

 