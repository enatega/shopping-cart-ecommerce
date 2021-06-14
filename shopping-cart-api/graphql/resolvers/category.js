const Category = require('../../models/category')
const SubCategory = require('../../models/subCategory')
const { transformCategory } = require('./merge')
const Product = require('../../models/product')
module.exports = {
  Query: {
    categories: async(_, args, context) => {
      console.log('categories: ')
      try {
        const categories = await Category.find({ isActive: true })
        return categories.map(category => {
          return transformCategory(category)
        })
      } catch (err) {
        throw err
      }
    },
    allCategories: async(_, args, context) => {
      console.log('allcategories')
      try {
        const categories = await Category.find({ isActive: true })
          .sort({ createdAt: -1 })
          .skip((args.page || 0) * 10)
          .limit(10)
        return categories.map(category => {
          return transformCategory(category)
        })
      } catch (err) {
        throw err
      }
    },
    test: async(_, args, context) => {
      console.log("test")
      await SubCategory.updateMany({isActive:true})
      return true
    }
  },
  Mutation: {
    createCategory: async(_, args, context) => {
      console.log('createCategory')
      try {
        const category = new Category({
          title: args.category.title
          // image: args.category.image
        })

        const result = await category.save()

        return { ...result._doc, _id: result.id }
      } catch (err) {
        throw err
      }
    },
    editCategory: async(_, args, context) => {
      console.log('editCategory')
      try {
        const category = await Category.findOne({ _id: args.category._id })

        category.title = args.category.title
        // category.image = args.category.image

        const result = await category.save()

        return { ...result._doc, _id: result.id }
      } catch (err) {
        throw err
      }
    },
    deleteCategory: async(_, { id }, context) => {
      console.log('deleteCategory')
      try {
        const category = await Category.findById(id)
        const subCategories = await SubCategory.find({ category: id })
        subCategories.forEach(async item => {
          await Product.updateMany(
            { subCategory: item._id },
            { isActive: false }
          )
          await SubCategory.findOneAndUpdate(
            { _id: item._id },
            { isActive: false }
          )
        })

        category.isActive = false
        const result = await category.save()
        return { ...result._doc, _id: result.id }
      } catch (err) {
        throw err
      }
    }
  }
}
