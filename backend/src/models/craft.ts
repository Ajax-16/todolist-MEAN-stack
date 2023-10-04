import {Schema, model} from "mongoose";
import { Craft } from "../interfaces/craft";

const craftSchema = new Schema<Craft>(
    {
       userId: {
        type: String,
        required: true
       },
       taskId: {
        type: String,
        required: true
        }
    },
    { 
        versionKey: false
    }
)

const CraftModel = model<Craft>("crafts", craftSchema);

export default CraftModel;