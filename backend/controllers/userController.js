require("dotenv").config();
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});

const generateOTP = () => {
    return randomstring.generate({ length: 6, charset: "numeric" });
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists for this email" });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const newUser = new userModel({ name, email, password: hashPassword });
        await newUser.save();

        const otp = generateOTP();

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Welcome to Our Application",
            text: `Hi ${name},\n\nThank you for registering with us!\n\nYour OTP is: ${otp}\n\nBest Regards,\nThe Application Team`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Registration email sent successfully");

        res.status(200).json({ message: "Sign up successful", success: true });
    } catch (error) {
        console.error("Error occurred during registration", error);
        return res.status(500).json({ message: "Error occurred during registration", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "No user found. Please register yourself first." });
        }
        const isComparePassword = bcrypt.compareSync(password, user.password);
        if (!isComparePassword) {
            return res.status(400).json({ message: "Invalid login credentials", success: false });
        } else {
            const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ message: "Login successful", success: true, token });
        }
    } catch (error) {
        console.error("Error occurred during login", error);
        return res.status(500).json({ message: "Error occurred during login", success: false });
    }
};

const verifyOTP = async (userId, otp) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return { success: false, message: "User not found" };
        }
        if (user.otp === otp) {
            user.otpVerified = true;
            await user.save();
            return { success: true, message: "OTP verified successfully" };
        } else {
            return { success: false, message: "Invalid OTP" };
        }
    } catch (error) {
        console.error("Error verifying OTP", error);
        return { success: false, message: "Error verifying OTP" };
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        const verificationResult = await verifyOTP(userId, otp);
        res.json(verificationResult);
    } catch (error) {
        console.error("Error verifying OTP", error);
        res.status(500).json({ success: false, message: "Error verifying OTP" });
    }
};

module.exports = { register, login, verifyOtp };
