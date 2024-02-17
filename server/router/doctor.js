import express from "express";
import Doctor from "../model/doctorSchema.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", adminAuth, (req, res) => {
	res.json(req.rootUser);
});

router.get("/all", adminAuth, async (req, res) => {
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
// Register
router.post("/register", adminAuth, async (req, res) => {
	const { name, email, phone, specialization, password, cpassword } = req.body;

	if (!name || !email || !phone || !specialization) {
		return res.status(422).json({ error: "Please fill all the fields" });
	}

	try {
		const doctorExist = await Doctor.findOne({ email: email });
		if (doctorExist) {
			return res.status(422).json({ error: "Doctor already exists" });
		}
		const doctor = new Doctor({
			name,
			email,
			phone,
			specialization,
		});

		const doctorRegister = await doctor.save();
		console.log(doctorRegister);
		if (doctorRegister) {
			res.status(201).json({ message: "Doctor registered successfully" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Failed to register" });
	} 
});

router.delete("/delete/:id", adminAuth, async (req, res) => {
	try {
		const id = req.params.id;
		const doctor = await Doctor.findByIdAndDelete(id);

		if (!doctor) {
			return res.status(404).json({ error: "Doctor not found" });
		}

		res.json({ message: "Doctor deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to delete Doctor" });
	}
});

// Login
// router.post("/login", async (req, res) => {
//   try {
//     let token;
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: "Please fill all the fields" });
//     }
//     const doctorLogin = await Doctor.findOne({ email: email });
//     if (doctorLogin) {
//       console.log(doctorLogin);
//       const isMatch = await bcrypt.compare(password, doctorLogin.password);
//       //JWT
//       token = await doctorLogin.generateAuthToken();

//       //cookies
//       res.cookie("jwtoken", token, {
//         expires: new Date(Date.now() + 25892000000),
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//       });
//       if (isMatch) {
//         return res.status(200).json({
//           message: "Successfully logged in",
//           token: token,
//           doctorId: doctorLogin._id,
//           doctorRole: doctorLogin.role,
//         });
//       } else {
//         return res.status(400).json({ error: "Invalid Credentials" });
//       }
//     } else {
//       return res.status(400).json({ error: "Invalid Credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Invalid Credentials" });
//   }
// });

export default router;
