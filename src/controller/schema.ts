import mongoose, { Schema, Document,Model} from 'mongoose';

// Define the user schema
export interface IUser extends Document {
  user_id: number;
  username: string;
  email: string;
  password: string;
  user_type: string;
  name: string;
  contact_details: {
    phone: string;
    address: string;
    country: string;
  };
}

const userSchema: Schema = new Schema({
  user_id: { type: Number, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  user_type: { type: String, required: true },
  name: { type: String, required: true },
  contact_details: {
    phone: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
  },
});
interface ICarList extends Document {
  // listing_id: number;
  sellerid:number,
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: string; // Should be one of: new, used, certified pre-owned
  description: string;
  image: Buffer;
  buyed:boolean;
  id:number // Binary image data
}

// Define a schema for the carlist document
const carListSchema: Schema<ICarList> = new Schema({
  // listing_id: { type: Number, unique: true }, // Auto-incremented listing ID
  sellerid:Number,
  brand: String,
  model: String,
  year: Number,
  price: Number,
  mileage: Number,
  condition: String, // Should be one of: new, used, certified pre-owned
  description: String,
  image: Buffer,
  buyed:Boolean,
  id:Number // Binary image data
});
export interface IBuy extends Document {
  car: {
    model: string;
    brand: string;
    year: number;
    mileage: number;
    price: number;
    cid:number
  };
  sellerId: number; // Seller's user ID
  buyerId: number; 
  id:number // Buyer's user ID
}

const buySchema = new Schema({
  car: {
    model: { type: String, required: true },
    brand: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    price: { type: Number, required: true },
    cid:{ type: Number, required: true }
  },
  sellerId: Number,
  buyerId: Number,
  id:Number
});
export interface IServiceProvider extends Document {
  provider_id: number; // Primary Key
  company_name: string;
  service_type: string;
  description: string;
  location: string;
  phoneno: string;
}

// Create a Mongoose schema for the Service Providers collection
const serviceProviderSchema = new Schema<IServiceProvider>({
  provider_id: { type: Number, required: true, unique: true }, // Primary Key
  company_name: { type: String, required: true },
  service_type: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  phoneno: { type: String, required: true },
});
export interface IService extends Document {
  appointment_id: number;
  buyer_id: number;
  provider_id: number;
  car_id: number;
  appointment_date: string;
}

// Create a Mongoose schema for the Service collection
const serviceSchema = new Schema<IService>({
  appointment_id: { type: Number, required: true, unique: true }, // Primary Key
  buyer_id: { type: Number, required: true },
  provider_id: { type: Number, required: true },
  car_id: { type: Number, required: true },
  appointment_date: { type: String, required: true },
});

export interface IReview extends Document {
  carId: number;
  satisfaction: string;
  description: string;
}

const reviewSchema = new Schema({
  carId: {
    type: Number,
    required: true,
  },
  satisfaction: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
export const Review:Model<IReview> = mongoose.model<IReview>('Review', reviewSchema,'review');


// Create and export the Mongoose model for the Service collection
export const Service:Model<IService> = mongoose.model<IService>('Service', serviceSchema,'service');


// Create and export the Mongoose model for the Service Providers collection
export const ServiceProvider:Model<IServiceProvider> = mongoose.model<IServiceProvider>('ServiceProvider', serviceProviderSchema,'serviceprovider');


// Create a model for the carlist collection
export const CarList :Model<ICarList> = mongoose.model<ICarList>('CarList', carListSchema,'carlist');
export const Buy :Model<IBuy> = mongoose.model<IBuy>('Buy', buySchema,'buys');
export {ICarList};
export default mongoose.model<IUser>('User', userSchema,'user');
