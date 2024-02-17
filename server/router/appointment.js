import express from "express";
import Appointment from "../model/appointmentSchema.js";
import Authenticate from "../middleware/authenticate.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/appointment", Authenticate, (req, res) => {
	res.json(req.rootUser);
});
router.get("/appointments/all", adminAuth, async (req, res) => {
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

router.post("/appointments", Authenticate, async (req, res) => {
	try {
		const { patientName, patient, doctor, date, time, symptoms, type } =
			req.body;

		// if (!date || !time || !patient || !doctor || !symptoms || !type) {
		// 	return res.status(422).json({ error: "Filled the field" });
		// }

		// Create a new Appointment document
		const appointment = new Appointment({
			patientName,
			patient,
			doctor,
			date,
			time,
			symptoms,
			type,
		});

		// Save the Appointment document to the database
		const data = await appointment.save();
		console.log(data);
		if (!data) {
			alert("Failed to save appointment");
		}
		res
			.status(201)
			.json({ message: "Appointment created successfully", appointment });
	} catch (error) {
		console.error("Error during appointment creation:", error);
		res
			.status(500)
			.json({ error: "There was an error while creating the appointment" });
	}
});

router.put("/appointments/edit/:id", async (req, res) => {
	try {
		const { status } = req.body;
		const { id } = req.params;

		let appointment = await Appointment.findById(id);
		if (!appointment) {
			return res.status(404).json({ msg: "Appointment not found" });
		}

		// Update the doctor in the appointment
		appointment = await Appointment.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		);

		res.json(appointment);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.delete("/appointments/delete/:id", adminAuth, async (req, res) => {
	try {
		const id = req.params.id;
		const appointment = await Appointment.findByIdAndDelete(id);

		if (!appointment) {
			return res.status(404).json({ error: "Appointment not found" });
		}

		res.json({ message: "Appointment deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete Appointment" });
	}
});

export default router;
