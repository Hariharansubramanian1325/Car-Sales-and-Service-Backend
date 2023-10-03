import { Request, Response } from 'express';
import { ServiceProvider } from './schema';

// Controller function to get all service providers
export const service = async (req: Request, res: Response) => {
  try {
    // Retrieve all service providers from the 'serviceproviders' collection
    const serviceProviders: any[] = await ServiceProvider.find();

    // Send the service providers as a JSON array in the response
    res.status(200).json(serviceProviders);
  } catch (error) {
    console.error('Error getting service providers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
