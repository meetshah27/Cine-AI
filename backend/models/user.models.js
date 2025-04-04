import mongoose from "mongoose";

//User model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, default: "" },
    searchHistory: [{ type: Array, default: [] }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);