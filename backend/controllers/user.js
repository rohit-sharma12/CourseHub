import User from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields",
            })
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({ message: "User created sucessfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to register" })
    }
} 

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields",
            })
        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
            })
        }
        const matchedPaasword = await bcrypt.compare(password, user.password);
        if (!matchedPaasword) {
            return res.status(400).json({
                message: "Incorrect email or password",
            })
        }
        generateToken(res,user, `Welcome back ${user.name}`);

        return res.status(201).json({ message: "User login sucessfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to register" })
    }
} 