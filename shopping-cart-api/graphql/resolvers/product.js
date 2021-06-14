const Product = require('../../models/product')
const User = require('../../models/user')
const {
  transformProduct,
  transformProducts,
  transformUser
} = require('./merge')
const uuidv4 = require('uuid/v4')

module.exports = {
  Query: {
    product: async(_, args, context) => {
      console.log('product')
      try {
        const product = await Product.findById(args.id)
        return transformProduct(product)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    productByIds: async(_, args, context) => {
      console.log('productByIds')
      try {
        const products = await Product.find({
          _id: { $in: args.ids },
          isActive: true
        })
        return products.map(product => {
          return transformProduct(product)
        })
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    products: async(_, args, context) => {
      console.log('products')
      try {
        const products = await Product.find({ isActive: true }).sort({
          createdAt: -1
        })
        return products.map(product => {
          return transformProduct(product)
        })
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    // /// Have to modify this method
    productByCategory: async(_, args, context) => {
      console.log('productByCategory')
      try {
        //     let filters = {}
        //     if (args.search) {
        //       const search = new RegExp(
        //         // eslint-disable-next-line no-useless-escape
        //         args.search.replace(/[\\\[\]()+?.*]/g, c => '\\' + c),
        //         'i'
        //       )
        //       const products = await Product.find({
        //         subCategory: args.subCategory,
        //         isActive: true,
        //         $or: [
        //           { title: { $regex: search } },
        //           { description: { $regex: search } }
        //         ]
        //       })
        //       console.log('products', search)
        //       return products.map(product => {
        //         return transformFood(product)
        //       })
        //     } else {
        //       if (args.onSale) filters.discounted = { $gt: 0 }
        //       if (args.min || args.max) {
        //         filters.price = { $gte: args.min, $lte: args.max }
        //       }
        //       filters = {}
        //       // if (args.inStock) filters.stock = { $gt: 0 }

        const products = await Product.find({
          subCategory: args.subCategory,
          isActive: true
        })
        return products.map(product => {
          return transformProduct(product)
        })
        //     }
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    whishlistProducts: async(_, args, { req, res }) => {
      console.log('whishlistProducts')
      try {
        const user = await User.findById(req.userId)
        return transformProducts(user.whishlist)
      } catch (error) {
        console.log('whishlistProducts error:', error)
        throw error
      }
    }
  },
  Mutation: {
    createProduct: async(_, args, context) => {
      console.log('createProduct')

      const product = new Product({
        title: args.productInput.title,
        description: args.productInput.description,
        skuCode: args.productInput.skuCode,
        subCategory: args.productInput.subCategory,
        image: args.productInput.image,
        attributes: args.productInput.attributes
          .map(item => {
            if (item.options.length) {
              return {
                _id: uuidv4(),
                ...item,
                options: item.options.map(option => {
                  return {
                    _id: uuidv4(),
                    ...option
                  }
                })
              }
            } else {
              return null
            }
          })
          .filter(data => data !== null),
        price: args.productInput.price,
        featured: args.productInput.featured
      })
      let createdFood
      try {
        const result = await product.save()
        createdFood = transformProduct(result)

        return createdFood
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    editProduct: async(_, args, context) => {
      console.log('editProduct')

      const product = await Product.findOne({ _id: args.productInput._id })
      product.title = args.productInput.title
      product.description = args.productInput.description
      product.subCategory = args.productInput.subCategory
      product.skuCode = args.productInput.skuCode
      product.image = args.productInput.image
      product.attributes = args.productInput.attributes
        .map(item => {
          if (item.options.length) {
            return {
              _id: uuidv4(),
              ...item,
              options: item.options.map(option => {
                return {
                  _id: uuidv4(),
                  ...option
                }
              })
            }
          } else {
            return null
          }
        })
        .filter(data => data !== null)
      product.price = args.productInput.price
      product.featured = args.productInput.featured

      let updatedFood
      try {
        const result = await product.save()
        updatedFood = transformProduct(result)

        return updatedFood
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    deleteProduct: async(_, { id }, context) => {
      console.log('deleteProduct')
      try {
        const product = await Product.findById(id)
        product.isActive = false
        const result = await product.save()
        return transformProduct(result)
      } catch (err) {
        throw err
      }
    },
    addToWhishlist: async(_, args, { req, res }) => {
      console.log('addToWhishList')
      try {
        if (!req.isAuth) throw new Error('Unauthenticated')
        const user = await User.findById(req.userId)
        const index = user.whishlist.indexOf(args.productId)
        if (index < 0) {
          user.whishlist.push(args.productId)
        } else {
          user.whishlist.splice(index, 1)
        }
        await user.save()
        return transformUser(user)
      } catch (err) {
        throw err
      }
    }
  }
}
