import { errorHandler } from "../utils/error.utils.js";
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const test = (req, res)=>{
try {
    res.json({msg : 'Testing'});
} catch (error) {
    console.log(error)
}
}

export const updateUser = async (req, res, next) => {
    
        if(req.user.id !== req.params.userId) {
            return next(errorHandler(403, 'Access Denied'))
        }

        if(req.body.password){
            if(req.body.password.length <4) {
                return  next(errorHandler(400, 'Password must be atleast 4 characters long'))
            }
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        if(req.body.username){
            if(req.body.username.length < 5 || req.body.username.length > 20){
                return next(errorHandler(400, 'Username must be between 5 to 20 characters'))
            }
            if(req.body.username.includes(' ')){
                return next(errorHandler(400, 'Username cannot contain spaces'))
            }
            if(req.body.username !== req.body.username.toLowerCase()){
                return next(errorHandler(400, 'Username must be lower case'))
            } 
            if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
                return next(
                  errorHandler(400, 'Username can only contain letters and numbers')
                );
            }
           
        }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profileImage: req.body.profileImage,
          }
        }, {new : true})
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}