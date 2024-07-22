import { Schema,model } from 'mongoose';

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        lowercase: true,
    }
}) 

const category = model('Category', categorySchema)
export default category;