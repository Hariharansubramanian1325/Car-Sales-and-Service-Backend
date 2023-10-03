import { Request, Response } from 'express';
import { Service } from './schema';
export const appointment = async (req: Request, res: Response) => {
    try {
      // Extract data from the API request body
      const { buyer_id, provider_id, car_id, appointment_date } = req.body;
  
      const lastUser:any = await Service.findOne({}, {}, { sort: {appointment_id: -1 } });
      var lastUserId:number = lastUser.appointment_id;
      lastUserId++;
  
      // Create a new service appointment document
      const newServiceAppointment: any = new Service({
        appointment_id: lastUserId,
        buyer_id,
        provider_id,
        car_id,
        appointment_date,
      });
  
      // Save the new service appointment to the 'service' collection
      await newServiceAppointment.save();
  
      res.status(201).json({ message: 'Service appointment added successfully' });
    } catch (error) {
      console.error('Error adding service appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };