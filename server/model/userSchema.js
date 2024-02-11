import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const saltRounds = 12;
const userSchema = new mongoose.Schema({
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
	work: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	cpassword: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "user",
		enum: ["user", "admin", "doctor"],
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.pre("save", async function (next) {
	if (this.isModified("password") && this.isModified("cpassword")) {
		if (this.password !== this.cpassword) {
			// Passwords don't match
			// You can't use res.status here, so throw an error instead
			throw new Error("Password does not match");
		} else {
			// Passwords match, hash them
			const hashedPassword = await bcrypt.hash(this.password, saltRounds);
			this.password = hashedPassword;
			this.cpassword = hashedPassword;
		}
	}
	next();
});

// Generating Token
userSchema.methods.generateAuthToken = async function () {
	try {
		let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
		this.tokens = this.tokens.concat({ token: token });
		await this.save();
		return token;
	} catch (error) {
		console.log(error);
	}
};
const User = mongoose.model("USER", userSchema);

export default User;
