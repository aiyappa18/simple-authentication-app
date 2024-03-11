import express from "express";
import bcrypt from 'bcrypt';
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
const router=express.Router();

router.post('/signup',async (req,res)=>{
    const {username,email,password}=req.body;
   const user=await User.findOne({email});
   if(user)
   {
    return res.json({message:"user already exists"})
   }
   const hashpassword=await bcrypt.hash(password,10)
   const newUser=new User({
    username,
    email,
    password:hashpassword,
    
   })
   await newUser.save()
   return res.json({status:true,message:"record registered"})
})

router.post('/login', async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.json({message:"User is not registered"})
    }

    const validPassword = await bcrypt.compare(password,user.password);
    if (!validPassword) {
        return res.json({message:"password is incorrect"})
    }
    const token=jwt.sign({username:user.username},process.env.KEY,{expiresIn:'1h'})
    //expiresIn means that after 1 hour the user will have to login again
    res.cookie('token',token,{httpOnly:true,maxAge:360000})
    //if we don't add httpOnly we can access throught the javascript code
    return res.json({status:true,message:"login successfully"})

})

router.post("/forgotpassword", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not registered" });
        }
        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '1h' }); // Include user's _id in the token
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.GOOGLE
            },
            tls: {
                rejectUnauthorized: false // Ignore SSL certificate validation
            }
        });

        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset password',
            text: `http://localhost:5173/resetpassword/${token}` // Include the token in the reset password URL
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending email:", error);
                return res.json({ message: "Error sending mail", error: error.message });
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({ message: "Email sent successfully" });
            }
        });

    } catch (error) {
        console.log(error);
    }
});

router.post('/resetpassword/:token',async(req,res)=>{
    const {token}=req.params;
    const {password}=req.body;
    try {
        const decoded=await jwt.verify(token,process.env.KEY);
        const id=decoded.id;
        const hashpassword=await bcrypt.hash(password,10);
        await User.findByIdAndUpdate({_id:id},{password:hashpassword})
        return res.json({status:true,message:"updated password"})
        
    } catch (error) {
       return res.json("invalid token");
    }
})

const verifyUser=(req,res,next)=>{
    try{
    const token=req.cookies.token;
    if(!token)
    {
        return res.json({status:false,message:"no token"})
    }
    const decoded=jwt.verify(token,process.env.KEY);
    next();
}
catch(err){
    return res.json(err);
}
}

router.get('/verify',verifyUser,(req,res)=>{
return res.json({status:true,message:"authorised"})
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({status:true});
})


export {router as UserRouter};