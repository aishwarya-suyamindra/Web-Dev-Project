'use strict';
import { User } from '../User/model.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret =  process.env.TOKEN_SECRET || "API"
export const register = function(req, res) {
  console.log("Request Body:", req.body);
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save()
  .then(user => {
    user.hash_password = undefined;
    const token = jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id, role:user.role }, secret, { expiresIn: '1h' });
    req.session['currentUser'] = user;
    return res.json({ token: token, name: user.fullName, userId: user._id, email: user.email });
  })
  .catch(err => {
    console.error("Error during registration:", err);
    return res.status(400).send({
      message: err.message || "An error occurred while saving the user."
    });
  });
};

export const sign_in = function(req, res) {
  User.findOne({ email: req.body.email })
    .exec()
    .then(function(user) {
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      req.session['currentUser'] = user;
      return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, secret, { expiresIn: '2h' }),
                        name: user.fullName, userId: user._id, email: user.email});
    })
    .catch(function(err) {
      throw err;
    });
    
};


export const loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};
export const profile = function(req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
};


export const getUserData = async function(req, res) {
  const {userId} = req.params
  const userData = await User.findOne({ _id: userId })
  if (!userData) {
      res.sendStatus(401)
      return
  }
  res.send(userData._doc)
}


export const followUser = async function(req, res) {
  const {userId, userIdToFollow, username} = req.body
  const userData = await User.findOne({ _id: userId })
  if (!userData) {
      res.sendStatus(404)
      return
  }
  const data = {name: username, userId: userIdToFollow}
  await User.updateOne({ _id: userId}, {$push: {following: data}} )

}