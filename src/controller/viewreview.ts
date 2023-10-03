// Import necessary modules and dependencies
import { Request, Response } from 'express';
import { Review } from './schema';

// Controller function to get reviews by carId
export const getReviews = async (req: Request, res: Response) => {
    try {
        const { carId } = req.body; // Get the carId from the request parameters

        // Search the review collection for reviews with the specified carId
        const reviews = await Review.find({ carId:carId });

        // Return the reviews as a JSON array
        res.json(reviews);
    } catch (error) {
        console.error('Error while fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
