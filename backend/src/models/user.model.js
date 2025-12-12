import mongoose from "mongoose";
import { userSchema } from "../Schema/user.schema.js";
import { MONGOOSE_MODEL } from "./data.js";

const User = mongoose.model(MONGOOSE_MODEL.USER, userSchema);
export default User;