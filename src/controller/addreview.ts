import { Request, Response } from 'express';
import {Review} from './schema';

// Controller function to add a new review
export const addreview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { carId, satisfaction, description } = req.body;
console.log(req.body)
    // Create a new review document
    const newReview = new Review({
      carId,
      satisfaction,
      description,
    });

    // Save the review to the database
    await newReview.save();

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error while adding review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
