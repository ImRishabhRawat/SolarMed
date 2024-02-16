import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 12;
const doctorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	specialization: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
	},
	role: {
		type: String,
		default: "doctor",
	},
});

const Doctor = mongoose.model("DOCTOR", doctorSchema);

export default Doctor;
