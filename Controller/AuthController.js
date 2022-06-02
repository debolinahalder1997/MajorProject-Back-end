
const AuthModel = require("../Model/AuthModel")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
/*------------------------RegistrationSection----------------------------*/



exports.postRegister = (req, res) => {
    const fname = req.body.firstname
    const lname = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    console.log(fname, lname, email, password)

    if (!fname) {
        return res.status(401).json({
            success: false,
            message: "first name is require"
        })
    }
    else if (!lname) {
        return res.status(401).json({
            success: false,
            message: "Last name is require"
        })
    } else if (!email) {
        return res.status(401).json({
            success: false,
            message: "Email is require"
        })
    } else if (!password) {
        return res.status(401).json({
            success: false,
            message: "Password is require"
        })
    }
    else {
        const userValue = new AuthModel({ firstname: fname, lastname: lname, email: email, password: password })

        AuthModel.findOne({ email: email }).then(emailExist => {
            if (emailExist) {
                console.log("Email Already Exists")
                return res.status(401).json({
                    success: false,
                    message: "Email alreay exists"
                })
            } else {
                return userValue.save().then(result => {
                    console.log("Data Added", result)
                    return res.status(200).json({
                        success: true,
                        message: "Register Successful"
                    })

                }).catch(err => {
                    console.log(err)
                    return res.status(401).json({
                        success: false,
                        message: "Not done"
                    })
                })
            }
        }).catch(err => {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })

        })
    }
}

/*------------------------LoginSection----------------------------*/

exports.postLogin = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log(email, password)

    if (!email) {
        return res.status(401).json({
            success: false,
            message: "Email is require"
        })
    } else if (!password) {
        return res.status(401).json({
            success: false,
            message: "Password is require"
        })
    } else {

        AuthModel.findOne({ email: email }).then(loginValue => {
            if (loginValue) {
                console.log("Logged in")
                const jwt_token = jwt.sign({ email: loginValue.email }, "ABCD", { expiresIn: '1h' })
                return res.status(200).json({
                    success: true,
                    message: "Successfully Login",
                    token: jwt_token,
                    result: loginValue
                })
            } else {
                console.log("Invalid Email and password")
                return res.status(401).json({
                    success: false,
                    message: "Error...."
                })
                // res.redirect('/RegLogin')
            }
        }).catch(err => {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        })
    }
}


