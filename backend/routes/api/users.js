const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .isAlphanumeric()
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('firstName').exists({checkFalsy: true}).isAlpha().isLength({min: 3, max: 16})
    .withMessage('Please provide a valid first name. (Ex: James)'),
    check('lastName').exists({checkFalsy: true}).isAlpha().isLength({min: 3, max: 16})
    .withMessage('Please provide a valid last name. (Ex: Williams)'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .isAlpha()
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

const router = express.Router();

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      let user;

      try{
      user = await User.create({ email, username, firstName, lastName, hashedPassword });
  
      if(user){
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName
        };
    
        await setTokenCookie(res, safeUser);
    
        return res.json({
          user: safeUser
        });
      }
      }

      catch(e){
        if (e.name === 'SequelizeUniqueConstraintError'){
          console.log(e)
          let errors = {}
          for(let err of e.errors){
            errors[err.path] = err.message
          }
          res.status(403);
          res.json({errors: errors})
        }
      }
    }
  );

module.exports = router;