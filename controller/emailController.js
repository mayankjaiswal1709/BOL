const UserModel = require("../models/UserModel");
const sendEmail = require("../services/emialService");

const addClient = async (req, res) => {
    const maildata = new UserModel(req.body);
    try {
        // const signuplink = `http://localhost:8000/user/signup`;
        const clientName = req.body.name;
        const email = req.body.email;
        const description = req.body.description;

        await sendEmail({
            email: process.env.SMPT_MAIL,
            subject: "Time to connect the pulse!",
            message: `Name: ${clientName} <br> Email: ${email} <br> Description: ${description}`,
            to: req.body.email,
        });

        await maildata.save();
        res.status(201).json({
            success: true,
            message: "Mail sent to client",
            Task: maildata,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error occurred: ${error.stack}`,
        });
    }
};

module.exports = { addClient };
