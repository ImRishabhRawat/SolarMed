import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

const Authenticate = async (req, res, next) => {
	try {
		// Extract the token from the Authorization header
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];
		if (!token) {
			return res.status(401).send("Unauthorized: No token provided");
		}
		const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

		const rootUser = await User.findOne({
			_id: verifyToken._id,
			"tokens.token": token,
		});

		if (!rootUser) {
			throw new Error("Couldn't find USER");
		}

		req.token = token;
		req.rootUser = rootUser;
		req.userID = rootUser._id;

		next();
	} catch (error) {
		res.status(401).send("Unauthorized: Invalid token");
		console.log(error);
	}
};

export default Authenticate;
