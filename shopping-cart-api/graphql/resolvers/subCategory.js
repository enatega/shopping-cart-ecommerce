const SubCategory = require('../../models/subCategory')
const Product = require('../../models/product')
const { transformSubCategory } = require('./merge')
module.exports = {
  Query: {
    subCategories: async(_, args, context) => {
      console.log('SubCategory')
      try {
        const subCategories = await SubCategory.find({ isActive: true })
        return subCategories.map(subCategory => {
          return transformSubCategory(subCategory)
        })
      } catch (err) {
        throw err
      }
    },
    subCategoriesById: async(_, args, context) => {
      console.log('subCategoryById: ', args.id)
      try {
        if (!args.id) throw new Error('Invalid Query')
        const subCategories = await SubCategory.find({
          category: args.id,
          isActive: true
        })
        return subCategories.map(subCategory => {
          return transformSubCategory(subCategory)
        })
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    createSubCategory: async(_, args, context) => {
      console.log('createSubCategory')
      try {
        const subCategory = new SubCategory({
          title: args.subCategory.title,
          image: args.subCategory.image,
          category: args.subCategory.category
        })

        const result = await subCategory.save()

        return transformSubCategory(result)
      } catch (err) {
        throw err
      }
    },
    editSubCategory: async(_, args, context) => {
      console.log('editSubCategory')
      try {
        const subCategory = await SubCategory.findOne({
          _id: args.subCategory._id
        })

        subCategory.title = args.subCategory.title
        subCategory.image = args.subCategory.image
        subCategory.category = args.subCategory.category

        const result = await subCategory.save()

        return transformSubCategory(result)
      } catch (err) {
        throw err
      }
    },
    deleteSubCategory: async(_, { id }, context) => {
      console.log('deleteCategory')
      try {
        const subCategory = await SubCategory.findById(id)
        await Product.updateMany({ subCategory: id }, { isActive: false })
        subCategory.isActive = false
        const result = await subCategory.save()
        return transformSubCategory(result)
      } catch (err) {
        throw err
      }
    }
  }
}
