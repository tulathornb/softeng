const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {
    try {
        const user = req.body
        const findUser = await User.findOne({ username:user.username }).exec()
        if(findUser)return res.status(400).send('User Already Exists!')
        const salt = await bcrypt.genSalt(10)
        let hashpass = await bcrypt.hash(user.password, salt)
        const result = await User.create({
            username : user.username,
            password : hashpass,
            fullname : user.fullname,
            status : 1,
            subject : []
        })
        res.send('Register Success!')
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
};

exports.login = async(req, res) => {
    try {
        
        const user = req.body
        let check = await User.findOne({username:user.username})

        if(check) {
           
        if(!check || !(bcrypt.compareSync(req.body.password,check.password)))
        {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.'});
        }
        return res.status(201).json({ message: jwt.sign({username: check.username, fullname: check.fullname , _id: check._id},'FTEST') , statusCode:201})
        }
        else {
            return res.status(400).send('User not found!')
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
};