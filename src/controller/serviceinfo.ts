import { Request, Response } from 'express';
import {Service} from './schema'; // Import your Service schema
import {Buy} from './schema'; // Import your Buys schema
import { ServiceProvider } from './schema';

// Controller function to get service and car details for appointments given by a buyer
export const serviceinfo = async (req: Request, res: Response) => {
  try {
    const { buyerid } = req.body; // Assuming the API returns the buyer's ID

    // Retrieve all service appointments given by the buyer from the 'service' collection
    const serviceAppointments = await Service.find({ buyer_id:buyerid });
    console.log(serviceAppointments)

    // Create an array to store service and car details for each appointment
    const serviceAndCarDetails = [];

    // Iterate through each service appointment
    const buyDetails = await Buy.findOne({ buyerId: buyerid });
    var id=buyDetails?.id;
    for (const appointment of serviceAppointments) {
      // Search for the corresponding car details in the 'buys' collection
      const buyDetails = await Buy.findOne({ buyerId: buyerid,id:id });
      id++;
      if (buyDetails) {
        // Create an object that contains both service and car details
        const providerdetails=await ServiceProvider.findOne({provider_id:appointment.provider_id})
        const combinedDetails = {
          service: appointment,
          car: buyDetails,
          provider:providerdetails
        };

        // Add the combinedDetails object to the array
        serviceAndCarDetails.push(combinedDetails);
      }
    }

    res.status(200).json(serviceAndCarDetails);
  } catch (error) {
    console.error('Error getting service and car details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
