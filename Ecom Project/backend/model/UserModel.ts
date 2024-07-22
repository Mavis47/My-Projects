import {Schema,model} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    answer:{
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
    }
},{timestamps: true}
)

const User = model("user", userSchema);
export default User;