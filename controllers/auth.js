const User = require("../models/User")
const bcrypt = require("bcryptjs");
const createError = require("../utilities/error");
const jwt = require("jsonwebtoken")
const {validationResult } = require('express-validator');
const transporter = require("../utilities/email")


exports.register = async (req, res, next)=>{
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

       User.findOne({ email }, async (err, user) => {
        // console.log(user)
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (user) { 
            return next(createError(400, "email already in use"))
        } 
        else if(!user){
         
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
            
         const newUser = new User({ 
            name: req.body.name,
            password:hash,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
         })
         const token = jwt.sign({id:newUser._id, isAdmin:newUser.isAdmin, isVerify:newUser.verify}, process.env.JWT, {expiresIn: "1d"})
         const token1 = jwt.sign({id:newUser._id, isAdmin:newUser.isAdmin, isVerify:newUser.verify}, process.env.JWT, {expiresIn: "1d"})
         newUser.token = token
         newUser.verifyEmailToken = token1
         await newUser.save()

         const verifyUser = `${req.protocol}://${req.get(
            "host"
          )}/api/verifyuser/${newUser._id}/${newUser.verifyEmailToken}`;
         
         const mailOptions = {
            from: process.env.USER,
            to: newUser.email,
            subject: "Successful Registration",
          html: `
           <h4>Hi ${newUser.name}</h4>
           <p>Thank you for registering with us. Please click on this link ${verifyUser} to verify</p>
            `,
        }
  
        transporter.sendMail(mailOptions,(err, info)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Email has been sent to your inbox", info.response);
            }
        })
         res.status(201).json({
            message: "User has been created.",
            data: newUser
        })
        }
      })
      
    }catch(err){
        next(err)
    }
}

exports.adminRegister = async (req, res, next)=>{
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

       User.findOne({ email }, async (err, user) => {
        // console.log(user)
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (user) { 
            return next(createError(400, "email already in use"))
        } 
        else if(!user){
         
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
            
         const newUser = new User({ 
            name: req.body.name,
            password:hash,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
         })

          User.findOneAndUpdate(newUser._id,{isAdmin:true},{ new: true })

         newUser.isAdmin = true
         const token = jwt.sign({id:newUser._id, isAdmin:newUser.isAdmin, isVerify:newUser.verify}, process.env.JWT, {expiresIn: "1d"})
         const token1 = jwt.sign({id:newUser._id, isAdmin:newUser.isAdmin, isVerify:newUser.verify}, process.env.JWT, {expiresIn: "1d"})
         newUser.token = token
         newUser.verifyEmailToken = token1

         const verifyUser = `${req.protocol}://${req.get(
          "host"
        )}/api/verifyuser/${newUser._id}/${newUser.verifyEmailToken}`;

         await newUser.save()
         const mailOptions ={
            from: process.env.USER,
            to: newUser.email,
            subject: "Successful Registration",
          html: `
           <h4>Hi ${newUser.name}</h4>
           <p>Thank you for registering with us. Please click on this link ${verifyUser} to verify</p>
            `,
        }
  
        transporter.sendMail(mailOptions,(err, info)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Email has been sent to your inbox", info.response);
            }
        })
         res.status(201).json({
            message: "User has been created.",
            data: newUser
        })
        }
      })
      
    }catch(err){
        next(err)
    }
}


exports.login = async (req, res, next)=>{
    try{
        const Users = await User.findOne({email: req.body.email})
        if(!Users) return next(createError(404, "User not found!"))
        // console.log(User.password)

        const isPasswordCorrect = await bcrypt.compare(req.body.password, Users.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username"))

        const token1 = jwt.sign({id:Users._id, isAdmin:Users.isAdmin}, process.env.JWT, {expiresIn: "1d"})
        Users.token = token1

        await Users.save()

        const {token, password, isAdmin, ...otherDetails} = Users._doc

        //  res.cookie("access_token", token, {
        //     httpOnly: true, 
        //  }).

        const mailOptions ={
            from: process.env.USER,
            to: Users.email,
            subject: "Successful Login!",
          html: `
           <h4>Dear ${Users.name}</h4>
           <p>Welcome back!</p>
           <p> You have logged in successfully to Onboarding</p>
           <p>If you did not initiate this, change your password immediately and send our Customer Center a email to <br/> ${process.env.USER}
           </p>
           <p>Why send this email? We take security very seriously and we want to keep you in the loop of activities on your account.</p>
       
            `,
        }
  
        transporter.sendMail(mailOptions,(err, info)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Email has been sent to your inbox", info.response);
            }
        })

         res.status(200).json({...otherDetails})
    }catch(err){
        next(err)
    }
}
exports.adminlogin = async (req, res, next)=>{
    try{
        const Users = await User.findOne({email: req.body.email})
        if(!Users) return next(createError(404, "User not found!"))
        // console.log(User.password)

        const isPasswordCorrect = await bcrypt.compare(req.body.password, Users.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username"))

        const token1 = jwt.sign({id:Users._id, isAdmin:Users.isAdmin}, process.env.JWT, {expiresIn: "1d"})
        Users.token = token1

        await Users.save()

        const {token, password, isAdmin, ...otherDetails} = Users._doc

        //  res.cookie("access_token", token, {
        //     httpOnly: true, 
        //  }).

        const mailOptions ={
            from: process.env.USER,
            to: Users.email,
            subject: "Successful Login!",
          html: `
           <h4>Dear ${Users.name}</h4>
           <p>Welcome back!</p>
           <p> You have logged in successfully to Onboarding</p>
           <p>If you did not initiate this, change your password immediately and send our Customer Center a email to <br/> ${process.env.USER}
           </p>
           <p>Why send this email? We take security very seriously and we want to keep you in the loop of activities on your account.</p>
       
            `,
        }
  
        transporter.sendMail(mailOptions,(err, info)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Email has been sent to your inbox", info.response);
            }
        })

         res.status(200).json({...otherDetails})
    }catch(err){
        next(err)
    }
}

exports.verify = async (req, res, next) => {
    try {
      console.log("user._id");
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return next(createError(400, "No user Found"));
      await User.findByIdAndUpdate(
        user._id,
        {
          verify: true,
          verifyEmailToken: null
        },
        { new: true }
      );
      await user.save();
  
    //   res
    //     .redirect(`http://localhost:3000/users/verifyuser/${user._id}`)
        res.status(200)
        .json({
          message: "successfully verified",
        });
    } catch (error) {
      next(error);
    }
  };

exports.forgotpassword = async (req, res, next) => {
  try {
      const {email} = req.body
      const userEmail = await User.findOne({email})
      if(!userEmail) return next(createError(400, "No user Found"))
      const token = jwt.sign({ id: userEmail._id }, process.env.JWT, {
        expiresIn: "1m",
      });

      const resetURL = `${req.protocol}://${req.get(
        'host',
      )}/auth/resetpassword/${userEmail._id}/${token}`

      const mailOptions ={
        from: process.env.USER,
        to: userEmail.email,
        subject: "Reset Password",
      html: `
       <p> Use this link ${resetURL} to rest your password</p>
        `,
    }

    transporter.sendMail(mailOptions,(err, info)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log("Email has been sent to your inbox", info.response);
        }
    })


  } catch (error) {
    next(error)
  }
}

exports.resetPassword = async (req, res, next) => {
  try{
    const id = req.params.id
    const token = req.params.token
   
  jwt.verify(token, process.env.JWT, async (err) => {
    if (err) {
      return next(createError(403, "Token not valid"));
    }
  });
  const userpaassword = await User.findById(id)
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt)
  userpaassword.password = hash
  userpaassword.save()
  res.send("you have successfuly change your password")

  }catch(err){next(err)}
}

