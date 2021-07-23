const { userModel } = require('./userModel')
const { registerValidation } = require('../registerValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecret = "my-token-secret";
const rounds = 10;


const createUser = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    else {
        const body = req.body;
        bcrypt.hash(body.password, rounds, (error, hash) => {
            if (error) res.status(500).json(error)
            else {
                const userCollection = new userModel({
                    username: req.body.username, email: req.body.email, address: req.body.address, mobile_no: req.body.mobile_no,
                    otp: req.body.otp, validity: req.body.validity, status: req.body.status, password: hash
                })
                // const userCollection = new userModel({body:req.body,email:req.body.email,password:hash})
                userCollection.save((err, result) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const token = generateToken({ body: req.body });
                        res.status(200).json({ token: token });
                    }

                })
            }
        })

    }

}



const login = async (req, res) => {
    userModel.findOne({ email: req.body.email }, (err, obj) => {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            if (obj == null) {
                return res.status(404).json('Email not found');
            }
            else {
                bcrypt.compare(req.body.password, obj.password, (error, match) => {
                    const token = generateToken({ body: req.body });
                    if (error) res.status(500).json(error)
                    else if (match) res.status(200).json({ token: token })
                    else res.status(403).json({ error: 'passwords donot match' })
                })
            }

        }
    })
}

const generateToken = function (body) {
    return jwt.sign(body, tokenSecret, { expiresIn: '1800s' });
}


exports.createUser = createUser;
exports.login = login;