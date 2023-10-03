import { Request, Response } from 'express';
import { CarList} from "./schema";
import { Buy } from './schema'; 

// Controller function to add a car purchase to the 'buys' collection
export const buy = async (req: Request, res: Response) => {
  try {
    // Extract buyerId and carId from the request body
    const { buyerId, carId } = req.body;

    // Retrieve car details (model, brand, year, mileage, price) and sellerId from the 'carlist' collection based on carId
    const carDetails = await CarList.findOne({ id: carId });

    if (!carDetails) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Extract car details and sellerId from the retrieved carDetails
    const { sellerid, brand,  model,year, price, mileage } = carDetails;
    const lastid:any = await Buy.findOne({}, {}, { sort: { id: -1 } });
    var lastUserId:number = lastid.id;
    lastUserId++;
    const id:number=lastUserId;
    console.log(id)
    // Create a new 'Buy' document with car details, sellerId, and buyerId
    const newBuy = new Buy({
      car: {
        model,
        brand,
        year,
        mileage,
        price,
        cid:carId
      },
      sellerId: carDetails.sellerid,
      buyerId,
      id,
    });

    // Save the new purchase to the 'buys' collection
    await newBuy.save();
    await CarList.updateOne({ id: carId }, { $set: { buyed: true } });
    res.status(201).json({ message: 'Car purchase added successfully' });
  } catch (error) {
    console.error('Error adding car purchase:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
