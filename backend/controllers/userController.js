const userModel = require('../models/userModel.js')
const validator = require('validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" })
}


const sendMail = async ({ to, subject, text, attachments }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
      family: 4,
    });

    await transporter.sendMail({
      from: `"Visitor Management" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      attachments,
    });

    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Email sending failed:", err.message);
  }
};




exports.signup = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;
        if (!email || !password || !role) {
            throw Error("All fields are mandatory");
        }
        if (!validator.isEmail(email)) {
            throw Error("Invalid Email");
        }
        if (!validator.isStrongPassword(password)) {
            throw Error("Password Not strong");
        }


        const exists = await userModel.findOne({ email })
        if (exists) {
            throw Error("User Already Exists");
        }

        const newpassword = await bcrypt.hash(password, 10);
        let newuser = await userModel.create({ email: email, password: newpassword, role: role, name: name })

        let token = createToken(newuser._id);
        setImmediate(async () => {
            try {
                await sendMail({
                    to: newuser.email,
                    subject: "Welcome to Visitor Management System",
                    text: `Hello ${newuser.name}, welcome aboard!`
                });

                if (role === "employee" || role === "security") {
                    await sendMail({
                        to: newuser.email,
                        subject: "Account Created",
                        text: `Email: ${newuser.email}\nPassword: ${password}\nRole: ${role}`
                    });
                }
            } catch (err) {
                console.error("Email failed:", err.message);
            }
        });
        res.json({ email: newuser.email, token: token });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.login = async (req, res) => {
    try {
        let { email, password, role } = req.body;
        if (!email || !password || !role) {
            throw Error("All fields are mandatory");
        }

        const exists = await userModel.findOne({ email })
        if (!exists) {
            throw Error("No user Found with this email");
        }

        const match = await bcrypt.compare(password, exists.password)
        if (!match || exists.role !== role) {
            throw Error("Invalid Credentails");
        }

        let token = createToken(exists._id);
        res.json({ email: email, token: token });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllUsers = async (req, res) => {
    const users = await userModel.find();

    if (!users) {
        return res.status(404).json({ "message": "No users found" });
    }

    res.status(200).json(users);

}

exports.deleteUser = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ "message": "User id is required" });
    }
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
        return res.status(404).json({ "message": "User not found" });
    }
    res.status(200).send(deletedUser)
}
