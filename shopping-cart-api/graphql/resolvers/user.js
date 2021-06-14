const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const { checkPhoneAlreadyUsed } = require('../../helpers/utilities')
const sendEmail = require('../../helpers/email')
const { transformUser } = require('./merge')
const { signupTemplate, signupText } = require('../../helpers/templates')

module.exports = {
  Query: {
    profile: async(_, args, { req, res }) => {
      console.log('profile')
      if (!req.isAuth) {
        throw new Error('Unauthenticated')
      }
      try {
        const user = await User.findById(req.userId)
        if (!user) throw new Error('User does not exist')
        return transformUser(user)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    users: async(_, args, context) => {
      console.log('users')
      try {
        const users = await User.find({ isActive: true }).sort({
          createdAt: -1
        })
        if (!users || !users.length) return []
        // transform users
        return users.map(user => {
          return transformUser(user)
        })
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  },
  Mutation: {
    createUser: async(_, args, context) => {
      console.log('createUser', args.userInput)
      try {
        if (args.userInput.facebookId) {
          const existingfacebookId = await User.findOne({
            facebookId: args.userInput.facebookId
          })
          if (existingfacebookId) {
            throw new Error(
              'Facebook account is already registered. Please Login'
            )
          }
        }
        if (args.userInput.appleId) {
          const existingAppleId = await User.findOne({
            appleId: args.userInput.appleId
          })
          if (existingAppleId) {
            throw new Error('Apple account is already registered. Please Login')
          }
        }
        if (args.userInput.email) {
          const existingEmail = await User.findOne({
            email: args.userInput.email
          })
          if (existingEmail) {
            throw new Error('Email is already associated with another account.')
          }
        }
        if (args.userInput.phone) {
          const existingPhone = await User.findOne({
            phone: args.userInput.phone
          })
          if (existingPhone) {
            throw new Error('Phone is already associated with another account.')
          }
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
        const user = new User({
          appleId: args.userInput.appleId,
          facebookId: args.userInput.facebookId,
          email: args.userInput.email,
          password: hashedPassword,
          phone: args.userInput.phone,
          name: args.userInput.name,
          notificationToken: args.userInput.notificationToken
        })

        const result = await user.save()
        sendEmail(result.email, 'Account Creation', signupText, signupTemplate)
        const token = jwt.sign(
          {
            userId: result.id,
            email: result.email || result.facebookId || result.appleId
          },
          'somesupersecretkey'
        )
        console.log({
          ...result._doc,
          userId: result.id,
          token: token,
          tokenExpiration: 1
        })
        return {
          ...result._doc,
          userId: result.id,
          token: token,
          tokenExpiration: 1
        }
      } catch (err) {
        throw err
      }
    },
    updateUser: async(_, args, { req, res }) => {
      console.log(args.updateUserInput)
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      const user = await User.findById(req.userId)
      if (!user) throw new Error('Please logout and login again')
      // check if phone number is already associated with another account
      if (
        !(await checkPhoneAlreadyUsed(req.userId, args.updateUserInput.phone))
      ) {
        try {
          user.name = args.updateUserInput.name
          user.phone = args.updateUserInput.phone
          const result = await user.save()
          return transformUser(result)
        } catch (err) {
          console.log(err)
          throw err
        }
      } else {
        throw new Error(
          'Phone number is already associated with another account'
        )
      }
    }
  }
}
