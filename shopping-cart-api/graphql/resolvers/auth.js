const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const Reset = require('../../models/reset')
const { credentials } = require('../../helpers/credentials')
const sendEmail = require('../../helpers/email')
const { transformUser } = require('./merge')
const {
  resetPasswordTemplate,
  resetPasswordText
} = require('../../helpers/templates')
const uuidv4 = require('uuid/v4')
module.exports = {
  Mutation: {
    login: async(
      _,
      { appleId, facebookId, email, password, type, name, notificationToken },
      context
    ) => {
      console.log('login', {
        appleId,
        facebookId,
        email,
        password,
        type,
        notificationToken
      })
      var user = facebookId
        ? await User.findOne({ facebookId: facebookId })
        : appleId
          ? await User.findOne({ appleId: appleId })
          : await User.findOne({ email: email })
      if (!user && appleId) {
        const newUser = new User({
          appleId: appleId,
          email: email,
          name: name
        })
        user = await newUser.save()
      }
      if (!user && type === 'google') {
        const newUser = new User({
          email: email,
          name: name
        })
        user = await newUser.save()
      }
      if (!user && facebookId) {
        const newUser = new User({
          facebookId: facebookId,
          email: email,
          name: name
        })
        user = await newUser.save()
      }
      if (!user) {
        user = await User.findOne({ phone: email })
        if (!user) throw new Error('User does not exist!')
      }
      if (type === 'default') {
        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
          throw new Error('Invalid credentials!')
          // throw new Error('Password is incorrect!');
        }
      }
      user.notificationToken = notificationToken
      await user.save()

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email || user.facebookId || user.appleId
        },
        'somesupersecretkey'
      )
      return {
        ...user._doc,
        email: user.email || user.appleId,
        userId: user.id,
        token: token,
        tokenExpiration: 1
      }
    },
    adminLogin: async(_, args, { req, res }) => {
      if (
        credentials.ADMIN_USER !== args.email ||
        credentials.ADMIN_PASSWORD !== args.password
      ) {
        throw new Error('Invalid credentials')
      }
      const user = {
        userId: credentials.USER_ID,
        email: args.email,
        password: args.password,
        name: credentials.NAME
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'somesupersecretkey'
      )
      return { ...user, password: '', token: token }
    },
    pushToken: async(_, args, { req, res }) => {
      if (!req.isAuth) throw new Error('Unauthenticated')
      try {
        console.log(args.token)
        const user = await User.findById(req.userId)
        user.notificationToken = args.token
        await user.save()

        return transformUser(user)
      } catch (err) {
        throw err
      }
    },
    forgotPassword: async(_, { email }, { req, res }) => {
      const user = await User.findOne({ email: email })
      if (!user) {
        throw new Error('User does not exist!')
      }
      // generate token,
      const token = uuidv4()
      const reset = new Reset({
        user: user.id,
        token
      })
      console.log(user.id, token)
      await reset.save()
      const resetPassword_template = resetPasswordTemplate([token])
      const resetPassword_text = resetPasswordText([token])

      sendEmail(
        user.email,
        'Reset Password',
        resetPassword_text,
        resetPassword_template
      )

      // email link for reset password
      return {
        result: true
      }
    },
    resetPassword: async(_, { password, token }, constext) => {
      console.log(password, token)
      const reset = await Reset.findOne({ token })
      if (!reset) {
        throw new Error('Invalid Token!')
      }
      const user = await User.findById(reset.user)
      if (!user) {
        throw new Error('Something went wrong. Contact Support!')
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      user.password = hashedPassword
      await user.save()
      await Reset.remove({ token })
      // validate token against time- not done yet
      // find user from reset object
      // generate hash of password
      // update user
      // remove token from reset collection
      // return result true
      return {
        result: true
      }
    },
    changePassword: async(_, { oldPassword, newPassword }, { req, res }) => {
      console.log('changePassword')
      try {
        if (!req.isAuth) throw new Error('Unauthenticated')
        const user = await User.findById(req.userId)
        if (!user) {
          throw new Error('User not found')
        }
        const isEqual = await bcrypt.compare(oldPassword, user.password)
        if (!isEqual) {
          throw new Error('Invalid credentials!')
          // throw new Error('Password is incorrect!');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12)
        user.password = hashedPassword
        await user.save()
        return true
      } catch (e) {
        throw e
      }
    }
  }
}
