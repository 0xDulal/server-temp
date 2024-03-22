import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import JWT from "jsonwebtoken";


//post register
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        //validation
        if (!name) {
            return res.send({ error: "Name is required" })
        }
        if (!email) {
            return res.send({ error: "Email is required" })
        }
        if (!password) {
            return res.send({ error: "Password is required" })
        }
        if (!phone) {
            return res.send({ error: "Number is required" })
        }
        if (!address) {
            return res.send({ error: "Address is required" })
        }
        //cheq user
        const exestingUser = await userModel.findOne({ email })
        //cheq Existing user
        if (exestingUser) {
            return res.status(200).send({
                success: true,
                message: "Already Registered, Please Login"
            });
        }
        //register user
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();
        res.status(200).send({
            success: true,
            message: "User Registration Successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
};

//post login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //Login validation
        if (!email) {
            return res.send({ error: "Email is required" })
        }
        if (!password) {
            return res.send({ error: "Password is required" })
        }
        // match user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Invalid Email or Password",
            });
        }
        // password validation
        const matchpass = await comparePassword(password, user.password)
        if (!matchpass) {
            return res.status(200).send({
                success: false,
                message: "Invalid Email or Password",
            });
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d', });
        res.status(200).send({
            success: true,
            message: "Login Successfull",
            userInfo: {
                name: user.name,
                email: user.email,

            }, token
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
};