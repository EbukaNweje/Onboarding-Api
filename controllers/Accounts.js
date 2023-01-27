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