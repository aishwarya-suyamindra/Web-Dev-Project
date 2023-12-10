import mongoose from "mongoose"
import UserSchema from "./schema.js"

export const User = mongoose.model("users", UserSchema)