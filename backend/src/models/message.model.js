import mongoose from "mongoose";
import { meesageSchema } from "../Schema/message.schema.js";
import { MONGOOSE_MODEL } from "./data.js";


const Message = mongoose.model(MONGOOSE_MODEL.MESSAGE, meesageSchema);

export default Message;