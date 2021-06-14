const { Expo } = require('expo-server-sdk')

const Configuration = require('../models/configuration')
const User = require('../models/user')
const Product = require('../models/product')
const https = require('https')
const { createWriteStream } = require('fs')
const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccountKey.json')

const expo = new Expo()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecommero-1f0eb.firebaseio.com'
})
// Upload image utility functions
const storeUpload = async({ stream, filename }) => {
  const path = `./public/images/${filename}`
  return await stream
    .pipe(createWriteStream(path))
    .on('finish', () => ({ path }))
    .on('error', error => {
      console.error('error', error)
    })
}

const processUpload = async(upload, type) => {
  type = type || ''
  const { createReadStream } = await upload
  const filename = `${Date.now() + type}.jpg`
  const stream = createReadStream()
  await storeUpload({ stream, filename })
  return `images/${filename}`
}

const saveImageToDisk = url => {
  const filename = `${Date.now()}.jpg`
  // eslint-disable-next-line quotes
  var file = createWriteStream(`./public/images/` + filename, { mode: 0o777 })
  https.get(url, function(response) {
    response.pipe(file)
  })
  return `images/${filename}`
}

const sendNotification = async orderId => {
  const configuration = await Configuration.findOne()
  if (!configuration) return false
  if (configuration.pushToken) {
    var message = {
      data: {
        orderid: orderId
      },
      token: configuration.pushToken,
      notification: {
        title: 'New Order | Ecommero',
        body: 'There are new orders in Ecommero'
      },
      webpush: {
        fcm_options: {
          link: process.env.NOTIFICATION_ON_CLICK
        }
      }
    }

    // // Send a message to the device corresponding to the provided
    // // registration token.
    admin
      .messaging()
      .send(message)
      .then(response => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response)
      })
      .catch(error => {
        console.log('Error sending message:', error)
      })
  }
}
// returns true if already used,false otherwise
const checkPhoneAlreadyUsed = async(userId, phone) => {
  const user = await User.find({ phone })
  if (user.length === 0 || (user.length === 1 && user[0].id === userId)) {
    return false
  }
  return true
}

const sendNotificationMobile = async messages => {
  const chunks = expo.chunkPushNotifications(messages)
  const tickets = []
  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
      tickets.push(...ticketChunk)
      console.log('tickets')
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
    } catch (error) {
      console.error('chunk', error)
    }
  }
  const receiptIds = []
  for (const ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if (ticket.id) {
      receiptIds.push(ticket.id)
    }
  }
  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds)
  // eslint-disable-next-line no-unused-expressions
  async() => {
    // Like sending notifications, there are different strategies you could use
    // to retrieve batches of receipts from the Expo service.
    for (const chunk of receiptIdChunks) {
      try {
        const receipt = await expo.getPushNotificationReceiptsAsync(chunk)
        // The receipts specify whether Apple or Google successfully received the
        // notification and information about an error, if one occurred.
        console.log(receipt)
        if (receipt.status === 'ok') {
          // eslint-disable-next-line no-undef
          return response.send({ message: 'working' })
        } else if (receipt.status === 'error') {
          console.error(
            `There was an error sending a notification: ${receipt.message}`
          )
          if (receipt.details && receipt.details.error) {
            // The error codes are listed in the Expo documentation:
            // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
            // You must handle the errors appropriately.
            console.error(`The error code is ${receipt.details.error}`)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}

const updateStockValue = async items => {
  items.map(async item => {
    const product = await Product.findById(item.productId)
    const data = []
    product.attributes.forEach((productData, index) => {
      item.selectedAttributes.forEach(itemData => {
        console.log('attribute', itemData)
        if (productData.attributeId === itemData.attributeId) {
          const options = []
          for (var i = 0; i < productData.options.length; i++) {
            if (productData.options[i].optionId === itemData.option.optionId) {
              options.push({
                ...productData.options[i],
                stock: productData.options[i].stock - item.quantity
              })
            } else {
              options.push({ ...productData.options[i] })
            }
          }
          data.push({
            ...productData,
            options
          })
        }
      })
    })
    product.attributes = data
    await product.save()
    console.log('stock updated', JSON.stringify(product.attributes))
  })
}

exports.saveImageToDisk = saveImageToDisk
exports.processUpload = processUpload
exports.storeUpload = storeUpload
exports.sendNotification = sendNotification
exports.checkPhoneAlreadyUsed = checkPhoneAlreadyUsed
exports.sendNotificationMobile = sendNotificationMobile
exports.updateStockValue = updateStockValue
