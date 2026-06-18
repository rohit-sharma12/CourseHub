import User from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import { deleteMediaFromClodinary, uploadMedia } from "../utils/cloudinary.js";

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
        console.log('LOGIN REQ BODY:', req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields",
            })
        };
        const user = await User.findOne({ email });
        console.log('FOUND USER FOR LOGIN:', !!user);
        if (user) console.log('USER HASHED PASSWORD:', user.password);
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
        generateToken(res, user, `Welcome back ${user.name}`);

        return res.status(201).json({ message: "User login sucessfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to register" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return res.status(200).json({
            message: "Logged out successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to logout",
        });
    }
};


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");
        if (!user) {
            return res.status(404).json({
                message: "Profile not found"
            })
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failled to load user"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "Profile not found"
            })
        }
        if (user.photoUrl) {
            const publicId = user.photoUrl.split('/').pop().split(".")[0];
            deleteMediaFromClodinary(publicId);
        }

        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = { name, photoUrl };
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
            new: true
        }).select("-password");
        return res.status(201).json({
            user: updatedUser,
            message: "Profile updated successfully."
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failled to load user"
        })
    }
}