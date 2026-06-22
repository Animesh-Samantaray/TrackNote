import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const protect = async (req, res,next) => {
  try {
    const token = req.cookies.token;
    if(!token){
         return res.status(401).json({message:'Not authorized'})
     }
     const decoded = await jwt.verify(token,process.env.JWT_SECRET);
     if(!decoded){
         return res.status(401).json({message:'Not authorized'})
     }
     const userId = decoded.id;
     const user = await User.findById(userId).select('-password');
     if(!user){
      return res.status(404).json({message:'User not found'});
     }
     req.user=user;
     next();

  } catch (error) {
     return res.status(500).json({message:error.message});
  }
}

export default protect;