import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        isSeller: { type: Boolean, default: false, required: true },
        //seller data
        seller: {
            name: String,
            logo: String,
            description: String,
            rating: { type: Number, default: 0, required: true },
            numberReviews: { type: Number, default: 0, required: true },
        },
    },
    {
        timestamps: true,
    },
);
// connect to   colection db.users
const User = mongoose.model("User", userSchema);
export default User;
