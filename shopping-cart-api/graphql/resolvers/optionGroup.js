const OptionGroup = require('../../models/optionGroup')
const Option = require('../../models/option')
const { transformOptionGroup } = require('./merge')

module.exports = {
  Query: {
    optionGroups: async(_, args, context) => {
      console.log('optionGroups')
      try {
        const options = await OptionGroup.find({ isActive: true })
        return options.map(option => {
          return transformOptionGroup(option)
        })
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    getOptionGroupsByCategory: async(_, args, context) => {
      console.log('getOptionGroupsByCategory')
      try {
        const options = await OptionGroup.find({
          subCategory: args.subCategory,
          isActive: true
        })
        return options.map(option => {
          return transformOptionGroup(option)
        })
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  },
  Mutation: {
    createOptionGroup: async(_, args, context) => {
      console.log('createOptionGroup')
      try {
        const data = new OptionGroup({
          title: args.optionGroupInput.title,
          subCategory: args.optionGroupInput.subCategory,
          options: args.optionGroupInput.options.map(option => {
            return new Option({
              title: option.title
            })
          })
        })
        const optionGroups = await data.save()

        return transformOptionGroup(optionGroups)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    editOptionGroup: async(_, args, context) => {
      console.log('editOption')
      try {
        const optionGroup = await OptionGroup.findById(
          args.optionGroupInput._id
        )
        if (!optionGroup) {
          throw new Error('Option Group does not exist')
        }
        optionGroup.title = args.optionGroupInput.title
        optionGroup.subCategory = args.optionGroupInput.subCategory
        optionGroup.options = args.optionGroupInput.options.map(option => {
          return new Option({
            _id: option._id || '',
            title: option.title
          })
        })

        const result = await optionGroup.save()
        return transformOptionGroup(result)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    deleteOptionGroup: async(_, args, context) => {
      console.log('deleteOption')
      try {
        const optionGroup = await OptionGroup.findById(args.id)
        optionGroup.isActive = false
        const result = await optionGroup.save()
        return result.id
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
}
