const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
/* const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password) */


//REGISTER
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error);
    }
})

//LOGIN

router.post("/login", async (req,res)=>{
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong credentials")
        
        const isValidPassword = (user,password) => bcrypt.compareSync(password, user.password)
        
        const hashedPassword = isValidPassword.toString()
        
        !hashedPassword && res.status(401).json("Wrong credentials")

        const accesToken = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin,      
        },
        process.env.JWT_SEC,
        {expiresIn:"3d"}
    );

    const {password, ...others} = user._doc;

    res.status(200).json({...others, accesToken});
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;