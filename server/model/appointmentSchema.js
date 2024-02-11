import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
	patientName: {
		type: String,
	},
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	date: {
		type: Date,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ["Scheduled", "Completed", "Cancelled"],
		default: "Scheduled",
	},
	symptoms: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: ["Chkec-up", "Follow-up", "Emergency"],
		required: true,
	},
});

const Appointment = mongoose.model("APPOINTMENT", appointmentSchema);

export default Appointment;
