const User = require('../models/User')

exports.getAllUser = async (req, res, next) => {
    try{
       const allUsers = await User.find()
       let users = allUsers.filter((user)=> user.isAdmin === false)
       res.status(200).json({
        message: "This all the users",
        lengthOfUser: users.length,
        data: users
       })
    }catch(e){
        next(e)
    }
}

exports.getOneUser= async(req,res, next) =>{
    try{
        const userId = req.params.userId
        const oneUser = await User.findById(userId)
        res.status(200).json({
            message: "this is the user",
            data: oneUser
        });
    }catch(e){
        next(e)
    }
};

exports.updateOneUser = async(req,res, next) =>{
    try{
        const userId = req.params.userId
        const oneUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
        res.status(200).json({
            message: "This all the Product",
            data: oneUser
        });
    }catch(e){
        next(e)
    }
};

exports.deleteOneUser = async(req,res, next) =>{
    try{
        const userId = req.params.userId
         await User.findByIdAndDelete(userId)
        res.status(202).json({message: "Deleted"});
    }catch(e){
        next(e)
    }
};




// exports.getAllAdmin = async (req, res, next) => {
//     try{
//        const allUsers = await User.find()
//        let admins = allUsers.filter((user)=> user.isAdmin === true)
//        res.status(200).json({
//         message: "This all the users",
//         lengthOfUser: admins.length,
//         data: admins
//        })
//     }catch(e){
//         next(e)
//     }
// }