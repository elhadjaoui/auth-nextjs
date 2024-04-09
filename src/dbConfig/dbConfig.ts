import { DataKey } from 'mongodb/src/client-side-encryption/client_encryption';
import mongoose from "mongoose";


export const connect = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URL!);
        const db = mongoose.connection;
        db.on ("connected", () => {
            console.log("Database connected successfully");
        });
        db.on("error", (error) => {
            // console.error.bind(console, "connection error:");
            console.log("Database connection error: ", error);
            process.exit(1);
         });


    } catch (error) {
        console.log("Something went wrong with the database connection");
        console.log("Error: ", error);

    }
}