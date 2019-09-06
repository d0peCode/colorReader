const Color = require('../models/color.model')
const httpStatus = require('http-status')
const passport = require('../services/passport')
const APIError = require('../utils/APIError')

exports.add = async (req, res, next) => {
  try {
    if (!passport.user) {
      res.status(httpStatus.UNAUTHORIZED)
      return res.send(new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED))
    } else {
      req.body.user = passport.user._id;
      new Color(req.body);
      res.status(httpStatus.CREATED);
      res.json({message: 'OK'})
    }
  } catch (e) {
    next(e)
  }
};

exports.remove = async (req, res, next) => {
  try {
    if (!passport.user) {
      res.status(httpStatus.UNAUTHORIZED)
      return res.send(new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED))
    } else {
      const color = await Color.findById(req.query.id);
      if(color.user === passport.user._id.toString()) {
        await Color.findByIdAndRemove(req.query.id);
        res.json({ message: 'OK' })
      } else {
        res.status(httpStatus.UNAUTHORIZED)
        return res.send(new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED))
      }
    }
  } catch (e) {
    next(e);
  }
};
