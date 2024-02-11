import express from "express";
import connectDB from "../db/conn.js";
import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.cookie("cookie","this is a cookie")
	res.send("Welcome from auth.js");
});

// promises .then .catch

// router.post("/register", (req, res) => {
// 	const { name, email, phone, work, password, cpassword } = req.body;

// 	if (!name || !email || !phone || !work || !password || !cpassword) {
// 		return res.status(422).json({ error: "Filled the field" });
// 	}

// 	User.findOne({ email: email })
// 		.then((userExist) => {
// 			if (userExist) {
// 				return res.status(422).json({ error: "User already exists" });
// 			}
// 			const user = new User({ name, email, phone, work, password, cpassword });

// 			user
// 				.save()
// 				.then(() => {
// 					res.status(201).json({ message: "User saved successfully" });
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 					res.status(500).json({ error: "Failed to register" });
// 				});
// 		})
// 		.catch((err) => console.log(err));
// });

router.post("/register", async (req, res) => {
	const { name, email, phone, work, password, cpassword } = req.body;

	if (!name || !email || !phone || !work || !password || !cpassword) {
		return res.status(422).json({ error: "Filled the field" });
	}

	try {
		const userExist = await User.findOne({ email: email });
		if (userExist) {
			return res.status(422).json({ error: "User already exists" });
		}
		const user = new User({
			name,
			email,
			phone,
			work,
			password,
			cpassword,
		});
		try {
			const userRegister = await user.save();
			console.log(userRegister);
			if (userRegister) {
				res.status(201).json({ message: "User saved successfully" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Failed to register" });
		}
	} catch (error) {
		console.log(error);
	}
});

//Sign In

router.post("/login", async (req, res) => {
	try {
		let token;
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: "Insufficient credentials" });
		}
		const userLogin = await User.findOne({ email: email });
		if (userLogin) {
			console.log(userLogin);
			const isMatch = await bcrypt.compare(password, userLogin.password);
			//JWT
			token = await userLogin.generateAuthToken();

			//cookies
			res.cookie("jwtoken", token, {
				//expires in 30 days so the code is in milliseconds
				expires: new Date(Date.now() + 25892000000),
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
			});
			// console.log(token);
			if (isMatch) {
				return res
					.status(200)
					.json({
						message: "Successfully logged in",
						token: token,
						userId: userLogin._id,
						userRole: userLogin.role,
					});
			} else {
				return res.status(400).json({ error: "Invalid Credentials" });
			}
		} else {
			return res.status(400).json({ error: "Invalid Credentials" }); // Add this line
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Invalid Credentials" });
	}
});



export default router;
