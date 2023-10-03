import { Request, Response } from "express";
import User, { IUser } from './schema';

// Define a controller function to add a user
const register = async (req: Request, res: Response) => {
  try {
    // Extract user details from the request body
    const { username, email, password, user_type, name, contact_details } = req.body;
    const lastUser:any = await User.findOne({}, {}, { sort: { user_id: -1 } });
    var lastUserId:number = lastUser.user_id;
    lastUserId++;
    // Create a new user document using the User model
    const newUser: IUser = new User({
      user_id:lastUserId,
      username,
      email,
      password, 
      user_type,
      name,
      contact_details,
    });
   

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Respond with the newly created user document
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error while adding a user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default register;

