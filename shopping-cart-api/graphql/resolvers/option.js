const Option = require('../../models/option')
const { transformOption } = require('./merge')

module.exports = {
  Query: {
    options: async(_, args, context) => {
      console.log('options')
      try {
        const options = await Option.find({ isActive: true })
        return options.map(option => {
          return transformOption(option)
        })
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    allOptions: async(_, args, context) => {
      console.log('options')
      try {
        const options = await Option.find({ isActive: true })
        return options.map(option => {
          return transformOption(option)
        })
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  },
  Mutation: {
    createOptions: async(_, args, context) => {
      console.log('createOption')
      try {
        const options = await Option.insertMany(args.optionInput)

        return options.map(option => {
          return transformOption(option)
        })
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    editOption: async(_, args, context) => {
      console.log('editOption')
      try {
        const option = await Option.findById(args.optionInput._id)
        if (!option) {
          throw new Error('Option does not exist')
        }
        option.title = args.optionInput.title
        option.description = args.optionInput.description

        const result = await option.save()
        return transformOption(result)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    deleteOption: async(_, args, context) => {
      console.log('deleteOption')
      try {
        const option = await Option.findById(args.id)
        option.isActive = false
        const result = await option.save()
        return result.id
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
}
