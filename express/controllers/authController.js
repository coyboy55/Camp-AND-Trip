const User = require('../models/User');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {

    async initialiseDate(req, res, next) {
        let { _id, token } = req.body;
        if (_id && token) {
            let decoded = jwt.verify(token, "randomString", { ignoreExpiration: true });
            if (_id == decoded._id) {
                User.find({ _id, token }, (err, result) => {
                    if (err) return next(err);
                    res.json({ success: true, result: result[0] });
                });
            } else {
                res.json({ success: false })
            }
        } else {
            res.json({ success: false })
        }
    }

    async signUp(req, res, next) {
        let body = req.body;
        let username=body.username
       
        User.find({"username":username}, async (err, response) => {
      let a=response.length;
     
            if (a===1)  {res.status(200).send('exist');}
            else{ 
                let salt = await bcrypt.genSalt(10);
                let hashedPassword = await bcrypt.hash(body.password, salt);
                body["password"] = hashedPassword;
                let user = new User(body);
                user.save((err, response) => {
                    if (err) return next(err);
        
                    let _id = response._id;
                    let token = jwt.sign({ _id }, "randomString", { expiresIn: 10000 });
        
                    User.updateOne({ _id }, {
                        $set: { token }
                    }, (err, result) => {
                        if (err) return next(err);
                        res.json({ success: true, result,token });
                    });
                });
            }
           
        
        });
    
      
    }

    async signIn(req, res, next) {
        let { username, password } = req.body;
        User.find({ username }, async (err, response) => {
            if (err) return next(err);
            let isMatch = await bcrypt.compare(password, response[0].password);
            if (isMatch) {
                let _id = response[0]._id;
                let token = jwt.sign({ _id }, "randomString", { expiresIn: 10000 });
                User.updateOne({ _id }, {
                    $set: { token }
                }, (err, result) => {
                    if (err) return next(err);
                    res.json({ success: true, result: {...response, _id, token } });
                });
            } else {
                res.json({ success: false })
            }
        });
    }

    async signOut(req, res, next) {
        let { _id } = req.body;
        User.updateOne({ _id }, {
            $set: { token: null }
        }, (err, result) => {
            if (err) return next(err);
            res.json({ success: true, result });
        });
    }
}

const authController = new AuthController();
module.exports = authController;