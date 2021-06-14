const nodemailer = require('nodemailer')
const Configuration = require('../models/configuration')
const transporter = (email, password) =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  })

const sendEmail = async(to, subject, text, template) => {
  if (!to) {
    console.log("user doesn't have email associated with his account")
    return
  }
  const configuration = await Configuration.findOne()
  if (!configuration) {
    console.log('email configuration not found')
    return
  }
  if (!configuration.enableEmail) {
    console.log('Email disabled in config.js')
    return
  }

  const emailer = transporter(configuration.email, configuration.password)
  var mailOptions = {
    from: configuration.email,
    to,
    subject,
    text,
    html: template
  }
  emailer.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('error sending mail', err)
    } else {
      console.log(`email sent successfully at ${to}`)
    }
  })
}

module.exports = sendEmail
