import mongoose from "mongoose";

export const ConnectToMongodb = async() => {
    try {
        const databaseURI = process.env.MONGO_URI as string;
        if(!databaseURI){
            console.log("MONGO_URI is Not Defined");
        }
        const connect = await mongoose.connect(databaseURI);
        if(connect){
            console.log("MongoDB Connected")
        }
    } catch (error) {
        console.log("Error In Connecting", error);
    }    
}