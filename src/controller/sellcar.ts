import { Request, Response } from "express";
import { CarList} from "./schema";
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage });

export const cars = async (req: Request, res: Response) => {
  try {
    // Access form data fields and uploaded file data
    const { sellerid,brand, model, year, price, mileage, condition, description } = req.body;
    const imageFile:any = req.file;
    const buyed=false;
    const lastid:any = await CarList.findOne({}, {}, { sort: {id: -1 } });
    var lastUserId:number = lastid.id;
    lastUserId++;
    console.log(lastUserId)
    // Create a new car listing document
    const newCar = new CarList({
      sellerid,
      brand,
      model,
      year,
      price,
      mileage,
      condition,
      description,
      image: imageFile.buffer,
      buyed,
      id:lastUserId, // Store the image data in the 'image' field as a buffer
    });

    // Save the new car listing to the MongoDB 'carlist' collection
    await newCar.save();

    res.status(201).json({ message: 'Car listing added successfully' });
  } catch (error) {
    console.error('Error adding car listing:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};