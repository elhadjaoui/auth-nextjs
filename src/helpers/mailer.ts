import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModels";

export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpire: Date.now() + 3600000,
            });
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                resetPasswordExpire: Date.now() + 3600000,
            });
        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ca1423c6358d3c",
                pass: "1fde7f402081bf"
            }
        });
        const mailOptioins = {
            from: "achraf-2060@outlook.fr",
            to: email,
            subject: emailType === "VERIFY" ? "Email Verification" : "Password Reset",
            html: `<p>Click <a href="${process.env.BASE_URL}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            </p>`
        };
        const mailResponse = await transport.sendMail(mailOptioins);
        return mailResponse;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};
