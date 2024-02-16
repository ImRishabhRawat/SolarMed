import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import User from "../model/userSchema.js";
import Appointment from "../model/appointmentSchema.js";
import Doctor from "../model/doctorSchema.js";

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

router.get("/all/doctors", adminAuth, async (req, res) => {
	// Use async/await to handle the promise
	try {
		// Query the user model for all the users
		const doctors = await Doctor.find({});
		// Send the user data as a JSON response
		res.json(doctors);
	} catch (err) {
		// Handle any errors
		console.error(err);
		res.status(500).json({ error: "Failed to get Doctors data" });
	}
});

router.put("/user/edit/:id", adminAuth, async (req, res) => {
	try {
		const { id } = req.params;
		const { role } = req.body;

		// Find the user by id and update their role
		const user = await User.findByIdAndUpdate(id, { role }, { new: true });

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json({ message: "Role updated successfully", user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to update role" });
	}
});


router.delete("/user/delete/:id", adminAuth, async (req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findByIdAndDelete(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json({ message: "User deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete user" });
	}
});

//Appointments

export default router;
