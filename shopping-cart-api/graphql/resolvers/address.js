const Address = require('../../models/address')
const User = require('../../models/user')
const { transformUser } = require('./merge')

module.exports = {
  Mutation: {
    createAddress: async(_, { addressInput }, { req, res }) => {
      console.log('createAddress')
      try {
        if (!req.isAuth) throw new Error('Unauthenticated')
        const user = await User.findById(req.userId)
        if (!user) {
          throw new Error('User not found')
        }

        await Address.updateMany(
          { _id: { $in: user.addresses } },
          { $set: { selected: false } }
        )

        const address = new Address({
          ...addressInput
        })
        const savedAddress = await address.save()
        user.addresses.push(savedAddress)
        const updatedUser = await user.save()

        return transformUser(updatedUser)
      } catch (e) {
        throw e
      }
    },
    editAddress: async(_, { addressInput }, { req, res }) => {
      console.log('editAddress')
      try {
        if (!req.isAuth) throw new Error('Unauthenticated')
        const user = await User.findById(req.userId)
        if (!user) {
          throw new Error('User not found')
        }
        const address = await Address.findById(addressInput._id)
        if (!address) {
          throw new Error('Address not found')
        }
        address.label = addressInput.label
        address.region = addressInput.region
        address.city = addressInput.city
        address.apartment = addressInput.apartment
        address.building = addressInput.building
        address.details = addressInput.details

        const updatedAddress = await address.save()
        const updatedUser = await user.save()

        return transformUser(updatedUser)
      } catch (e) {
        throw e
      }
    },
    deleteAddress: async(_, { id }, { req, res }) => {
      console.log('deleteAddress')
      try {
        if (!req.isAuth) throw new Error('Unauthenticated')
        const user = await User.findById(req.userId)
        if (!user) {
          throw new Error('User not found')
        }
        const address = await Address.findById(id)
        if (!address) {
          throw new Error('Address not found')
        }
        address.isActive = false
        const result = await address.save()
        const updatedUser = await User.findById(req.userId)
        return transformUser(updatedUser)
        // console.log({
        //   ...result._doc,
        //   _id: result.id
        // })
        // return {
        //   ...result._doc,
        //   _id: result.id
        // }
      } catch (e) {
        throw e
      }
    },
    selectAddress: async(_, { id }, { req }) => {
      console.log('selectAddress')
      try {
        if (!req.isAuth) throw new Error('Unauthenticated')
        const user = await User.findById(req.userId)
        if (!user) {
          throw new Error('User not found')
        }

        await Address.updateMany(
          { _id: { $in: user.addresses } },
          { $set: { selected: false } }
        )
        await Address.updateOne({ _id: id }, { $set: { selected: true } })

        return transformUser(user)
      } catch (e) {
        throw e
      }
    }
  }
}
