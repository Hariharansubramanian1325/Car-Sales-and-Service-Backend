import { Request, Response } from 'express';
import User, { IUser } from './schema'; // Import your User schema

import { Buy } from './schema';

// Controller function to get user details and their sold cars
export const buyer = async (req: Request, res: Response) => {
  try {
    const { id } = req.body; // Assuming the API returns the user's ID

    // Retrieve user details from the 'user' collection
    const user: IUser | null = await User.findOne({ user_id: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Search for cars with the user's ID as the seller ID in the 'carlist' collection
    const cars= await Buy.find({buyerId:id});

    

    // Create an array to store the user details and sold cars
    const userDetailsAndSoldCars = {
      user,
      cars
    };

    res.status(200).json(userDetailsAndSoldCars);
  } catch (error) {
    console.error('Error getting user details and sold cars:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
