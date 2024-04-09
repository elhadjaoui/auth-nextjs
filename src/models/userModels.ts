import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"]

    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        maxlength: [50, "Email can not be more than 50 characters"],
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
        // select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    resetPasswordExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date, 
    date: {
        type: Date, 
        default: Date.now
    }
});

export default mongoose.models.User || mongoose.model("User", userShema); 