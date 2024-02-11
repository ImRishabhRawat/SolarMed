import mongoose, { Mongoose } from "mongoose";


const connectDB = (url) => {
    mongoose.set("strictQuery", true);

    mongoose.connect(url)
        .then(() => console.log("Mongoose Connected"))
        .catch(err => console.log(err));
}

export default connectDB;