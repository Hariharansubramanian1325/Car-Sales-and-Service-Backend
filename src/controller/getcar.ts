import { Request, Response } from 'express';
import { CarList} from "./schema"; // Import your CarList schema
import User, { IUser } from './schema';

// Controller function to get all cars with seller details
export const display = async (req: Request, res: Response) => {
  try {
    // Retrieve all cars from the 'carlist' collection
    const cars = await CarList.find();

    // Initialize an array to store the results
    const carsWithSellerDetails = [];

    // Iterate through each car to get seller details
    for (const car of cars) {
      if(!car.buyed){
      const sellerid  = car.sellerid;

      // Retrieve the seller's personal and contact details from the 'user' collection
      const sellerDetails = await User.findOne({ user_id: sellerid });

      // Create a single object for the car with seller details
      const carWithSeller = {
        car,
        sellerDetails, // Contains seller's personal and contact details
      };

      // Add the carWithSeller object to the results array
      carsWithSellerDetails.push(carWithSeller);
    }
    console.log(carsWithSellerDetails.length)
  }
    // Send the result as an array of car objects with seller details
    res.status(200).json(carsWithSellerDetails);
  } catch (error) {
    console.error('Error getting cars with seller details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
