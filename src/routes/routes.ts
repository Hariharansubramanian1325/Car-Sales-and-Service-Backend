import { Router } from "express"
import login from "../controller/logincontroller";
import register from "../controller/register";
import { cars } from "../controller/sellcar";
import { display } from "../controller/getcar";
import multer from 'multer';
import { buy } from "../controller/buycar";
import { service } from "../controller/serviceprovider";
import { appointment } from "../controller/service_appointment";
import { seller } from "../controller/sellerprofile";
import { buyer } from "../controller/buyerprofile";
import { serviceinfo } from "../controller/serviceinfo";
import { addreview } from "../controller/addreview";
import { getReviews } from "../controller/viewreview";
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage });
const routes=Router();
routes.post('/login',login)
routes.post('/register',register)
routes.post('/sellcar',upload.single('image'),cars)
routes.post('/getcar',display)
routes.post('/buycar',buy)
routes.post('/reqservice',service)
routes.post('/addservice',appointment)
routes.post('/seller',seller)
routes.post('/buyer',buyer)
routes.post('/serviceinfo',serviceinfo)
routes.post('/addreview',addreview)
routes.post('/getreview',getReviews)


export default routes;