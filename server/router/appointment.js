import express from "express";
import Appointment from "../model/appointmentSchema.js"; 
import Authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.get('/appointment',Authenticate, (req, res) => { 
	res.json(req.rootUser); 
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

export default router;
