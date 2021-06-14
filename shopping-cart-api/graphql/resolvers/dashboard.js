/* eslint-disable no-unmodified-loop-condition */
const Order = require('../../models/order')
const User = require('../../models/user')
const Review = require('../../models/review')
const { months } = require('../../helpers/enum')
module.exports = {
  Query: {
    getDashboardTotal: async(_, args, context) => {
      console.log('getOrdersCount from dashboard')
      console.log(args)
      try {
        const starting_date = new Date(args.starting_date)
        const ending_date = new Date(args.ending_date)
        ending_date.setDate(ending_date.getDate() + 1)
        const filter_date = {
          createdAt: { $gte: starting_date, $lt: ending_date }
        }
        const orders_count = await Order.countDocuments(filter_date)
        const users_count = await User.countDocuments(filter_date)
        const paid_orders = await Order.find({
          ...filter_date,
          paymentStatus: 'PAID'
        }).select('paidAmount')
        const paid_orders_amount = paid_orders.reduce(
          (acc, order) => acc + order.paidAmount,
          0
        )
        const reviews = await Review.find({ ...filter_date }).select('rating')
        let total_ratings = 0
        let avg_ratings = 0
        if (reviews && reviews.length > 0) {
          total_ratings = reviews.reduce(
            (acc, review) => acc + review.rating,
            0
          )
          avg_ratings = total_ratings / reviews.length
        }
        return {
          total_orders: orders_count,
          total_users: users_count,
          total_sales: paid_orders_amount.toFixed(2),
          total_ratings: total_ratings,
          avg_ratings: avg_ratings.toFixed(2)
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    getDashboardSales: async(_, args, context) => {
      console.log('getDashboardSales')
      try {
        const ending_date = new Date(args.ending_date)
        ending_date.setDate(ending_date.getDate() + 1)
        const sales_value = []
        const current_date = new Date(args.starting_date)
        while (current_date < ending_date) {
          const filter_start = new Date(current_date)
          const filter_end = new Date(filter_start).setDate(
            filter_start.getDate() + 1
          )
          const filter = { createdAt: { $gte: filter_start, $lt: filter_end } }
          const orders = await Order.find({
            ...filter,
            paymentStatus: 'PAID'
          }).select('paidAmount')
          const day = `${
            months[current_date.getMonth()]
          } ${current_date.getDate()}`
          const temp_sales_value = { day }
          // eslint-disable-next-line dot-notation
          temp_sales_value['amount'] = orders
            .reduce((acc, order) => acc + order.paidAmount, 0)
            .toFixed(2)
          sales_value.push(temp_sales_value)
          current_date.setDate(current_date.getDate() + 1)
        }
        return {
          orders: sales_value
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    getDashboardOrders: async(_, args, context) => {
      console.log('getDashboardOrders')
      try {
        const ending_date = new Date(args.ending_date)
        ending_date.setDate(ending_date.getDate() + 1)
        const sales_value = []
        const current_date = new Date(args.starting_date)
        while (current_date < ending_date) {
          const filter_start = new Date(current_date)
          const filter_end = new Date(filter_start).setDate(
            filter_start.getDate() + 1
          )
          const filter = { createdAt: { $gte: filter_start, $lt: filter_end } }
          const day = `${
            months[current_date.getMonth()]
          } ${current_date.getDate()}`
          const temp_sales_value = { day }
          // eslint-disable-next-line dot-notation
          temp_sales_value['count'] = await Order.countDocuments(filter)
          sales_value.push(temp_sales_value)
          current_date.setDate(current_date.getDate() + 1)
        }
        return {
          orders: sales_value
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
}
