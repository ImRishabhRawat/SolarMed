import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import User from "../model/userSchema.js";
import Appointment from "../model/appointmentSchema.js";

const router = express.Router();

router.get("/", adminAuth, (req, res) => {
	res.json(req.rootUser);
});

router.get("/all/users", adminAuth, async (req, res) => {
	// Use async/await to handle the promise
	try {
		// Query the user model for all the users
		const users = await User.find({});
		// Send the user data as a JSON response
		res.json(users);
	} catch (err) {
		// Handle any errors
		console.error(err);
		res.status(500).json({ error: "Failed to get user data" });
	}
});
router.get("/all/appointments", adminAuth, async (req, res) => {
	// Use async/await to handle the promise
	try {
		// Query the user model for all the users
		const appointments = await Appointment.find({});
		// Send the user data as a JSON response
		res.json(appointments);
	} catch (err) {
		// Handle any errors
		console.error(err);
		res.status(500).json({ error: "Failed to get appointments data" });
	}
});

export default router;
