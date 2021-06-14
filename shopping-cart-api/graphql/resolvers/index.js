const authResolver = require('./auth')
const productResolver = require('./product')
const orderResolver = require('./order')
const categoryResolver = require('./category')
const configurationResolver = require('./configuration')
const optionResolver = require('./option')
const optionGroupResolver = require('./optionGroup')
const couponResolver = require('./coupon')
const dashboardResolver = require('./dashboard')
const userResolver = require('./user')
const addressResolver = require('./address')
const subCategoryResolver = require('./subCategory')

const rootResolver = {
  Query: {
    ...dashboardResolver.Query,
    ...authResolver.Query,
    ...productResolver.Query,
    ...orderResolver.Query,
    ...categoryResolver.Query,
    ...configurationResolver.Query,
    ...optionResolver.Query,
    ...optionGroupResolver.Query,
    ...couponResolver.Query,
    ...userResolver.Query,
    ...subCategoryResolver.Query
  },
  Subscription: {
    ...orderResolver.Subscription
  },
  Mutation: {
    ...addressResolver.Mutation,
    ...authResolver.Mutation,
    ...productResolver.Mutation,
    ...orderResolver.Mutation,
    ...categoryResolver.Mutation,
    ...configurationResolver.Mutation,
    ...optionResolver.Mutation,
    ...optionGroupResolver.Mutation,
    ...couponResolver.Mutation,
    ...userResolver.Mutation,
    ...subCategoryResolver.Mutation
  }
}

module.exports = rootResolver
