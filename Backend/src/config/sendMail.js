import nodemailer from "nodemailer"
import { ApiError } from "../../utils/ApiError.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (to , otp) => {
    try {
        await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: to, // list of recipients
    subject: "Reset Your Password", // subject line
    html: `<p>Your OTP to reset password is ${otp}. It will expires in 5min </p>`, // HTML body
  });
    } catch (error) {
        console.log(error);
        throw new ApiError(500 , "Error while sending the mail")
        
    }
};

export default sendMail