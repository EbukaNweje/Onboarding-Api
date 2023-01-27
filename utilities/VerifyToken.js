// import Student from "../models/AddStudent";
const User = require("../models/User")

const createError = require("../utilities/error");
const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next)=>{
    // const token = req.cookies.access_token;
    const adminId = req.params.adminId;
    const user = await User.findById(adminId)
    // console.log(user)
    const token = user.token;
    if(!token){
        return next(createError(401, "you are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, playload)=>{
        if(err)return next(createError(401, "token is not valid!"));
        req.Users = playload
        // console.log(req.Student)
        next()
    })
};

// const verifyStudent = (req, res, next)=>{
//     verifyToken(req, res, next, ()=>{
//         if(req.User.id === req.params.id || req.User.isAdmin){
//             next()
//         } else {
//            return next(createError(403, "you are not authenticated!"));
//         }
//     })
// };

const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.Users.isAdmin){
            next()
        } else {
           return next(createError(403, "you are not an Admin!"));
        }
    })
} 

module.exports =  {verifyToken, verifyAdmin}