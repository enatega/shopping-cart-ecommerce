// createCoupon(couponInput:CouponInput!):Coupon!
// editCoupon(couponInput:CouponInput!):Coupon!
// deleteCoupon(id:String!):String!

const Coupon = require('../../models/coupon')

module.exports = {
  Query: {
    coupons: async(_, args, context) => {
      console.log('coupons')
      try {
        const coupons = await Coupon.find({ isActive: true }).sort({
          createdAt: -1
        })
        return coupons.map(coupon => ({
          ...coupon._doc,
          _id: coupon.id
        }))
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  },
  Mutation: {
    coupon: async(_, args, context) => {
      console.log('coupon')
      try {
        const coupon = await Coupon.findOne({
          isActive: true,
          code: args.coupon
        })
        if (coupon) {
          return {
            ...coupon._doc,
            _id: coupon.id
          }
        } else {
          throw new Error('Coupon code not found')
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    createCoupon: async(_, args, context) => {
      console.log('createCoupon')
      try {
        const count = await Coupon.countDocuments({
          code: args.couponInput.code,
          isActive: true
        })
        if (count > 0) throw new Error('Coupon Code already exists')
        const coupon = new Coupon({
          code: args.couponInput.code,
          discount: args.couponInput.discount,
          enabled: args.couponInput.enabled
        })
        const result = await coupon.save()
        return {
          ...result._doc,
          _id: result.id
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    editCoupon: async(_, args, context) => {
      console.log('editCoupon')
      try {
        const count = await Coupon.countDocuments({ _id: args.couponInput._id })
        if (count > 1) throw new Error('Coupon code already used')
        const coupon = await Coupon.findById(args.couponInput._id)
        if (!coupon) {
          throw new Error('Coupon does not exist')
        }
        coupon.code = args.couponInput.code
        coupon.discount = args.couponInput.discount
        coupon.enabled = args.couponInput.enabled
        const result = await coupon.save()
        return {
          ...result._doc,
          _id: result.id
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    deleteCoupon: async(_, args, context) => {
      console.log('deleteCoupon')
      try {
        const coupon = await Coupon.findById(args.id)
        coupon.isActive = false
        const result = await coupon.save()
        return result.id
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
}
