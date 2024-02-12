import * as dotenv from "dotenv";
import express from "express";
import connectDB from "./db/conn.js";
import User from "./model/userSchema.js";
import authRoutes from "./router/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import appointmentRoutes from "./router/appointment.js";
import adminRoutes from "./router/admin.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({ origin: "https://solar-med.vercel.app/", credentials: true }));

app.use(cookieParser());
//Middleware
app.use(authRoutes);
app.use("/doc", appointmentRoutes);
app.use("/admin", adminRoutes);



// app.get("/", middleware,(req, res) => {
// 	res.send("Welcome from app.js");
// });

// app.get("/about", (req, res) => {
// 	res.cookie("aboutCookie", "thisIsTheAboutCookie");
// 	res.send("Welcome on about page");
// });

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(8080, () =>
			console.log("Server is running at port http://localhost:8080")
		);
	} catch (error) {
		console.log(error.message);
	}
};
startServer();
