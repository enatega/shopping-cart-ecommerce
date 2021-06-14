const Configuration = require('../../models/configuration')

module.exports = {
  Query: {
    configuration: async(_, args, context) => {
      const configuration = await Configuration.findOne()
      if (!configuration) {
        return {
          _id: '',
          orderPrefix: '',
          mongodbUrl: '',
          email: '',
          password: '',
          enableEmail: true,
          clientId: '',
          clientSecret: '',
          sandbox: false,
          publishableKey: '',
          secretKey: '',
          deliveryCharges: 0,
          currency: '',
          currencySymbol: ''
        }
      }
      return {
        ...configuration._doc,
        _id: configuration.id
      }
    }
  },
  Mutation: {
    saveOrderConfiguration: async(_, args, context) => {
      console.log('saveOrderConfiguration', args.configurationInput)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.orderPrefix = args.configurationInput.orderPrefix
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    },
    saveEmailConfiguration: async(_, args, context) => {
      console.log('saveEmailConfiguration', args.configurationInput)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.email = args.configurationInput.email
      configuration.password = args.configurationInput.password
      configuration.enableEmail = args.configurationInput.enableEmail
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    },
    saveMongoConfiguration: async(_, args, context) => {
      console.log('saveMongoConfiguration', args.configurationInput)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.mongodbUrl = args.configurationInput.mongodbUrl
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    },
    uploadToken: async(_, args, context) => {
      console.log(args.pushToken)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.pushToken = args.pushToken
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    },
    savePaypalConfiguration: async(_, args, context) => {
      console.log('savePaypalConfiguration', args.configurationInput)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.clientId = args.configurationInput.clientId
      configuration.clientSecret = args.configurationInput.clientSecret
      configuration.sandbox = args.configurationInput.sandbox
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    },
    saveStripeConfiguration: async(_, args, context) => {
      console.log('saveStripeConfiguration', args.configurationInput)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.publishableKey = args.configurationInput.publishableKey
      configuration.secretKey = args.configurationInput.secretKey
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    },
    saveDeliveryConfiguration: async(_, args, context) => {
      console.log('saveDeliveryConfiguration', args.configurationInput)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.deliveryCharges = args.configurationInput.deliveryCharges
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    },
    saveCurrencyConfiguration: async(_, args, context) => {
      console.log('saveCurrencyConfiguration', args.configurationInput)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.currency = args.configurationInput.currency
      configuration.currencySymbol = args.configurationInput.currencySymbol
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    }
  }
}
