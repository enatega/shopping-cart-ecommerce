module.exports = {
  signupTemplate: `<h1>Congratulations!</h1>
    <p>You have successfully created an account for Ecommero</p>`,
  signupText: `<h1>Congratulations</h1>
    <p>You have success created an account for Ecommero</p>`,
  placeOrderTemplate(params) {
    const address = `Apartment: ${params[2].apartment}, ${params[2].building}, ${params[2].city}, ${params[2].region},${params[2].details}`
    return `<h1>Order</h1>
    <p>You placed an order on Ecommero</p>
    <p>Order Id : ${params[0]}</p>
    <p>Items : ${params[1]}</p>
    <p> Delivery Address: ${address}</p >
    <p>Cost : ${params[3]}</p>
    <p>Delivery Charges : ${params[4]}</p>
    <p>Total : ${params[5]}</p>
    `
  },
  placeOrderText(params) {
    const address = `Apartment: ${params[2].apartment}, ${params[2].building}, ${params[2].city}, ${params[2].region},${params[2].details}`
    return `<h1>Order</h1>
<h4>You placed an order on Ecommero</h4>
    <p>Order Id : ${params[0]}</p>
    <p>Items : ${params[1]}</p>
    <p> Delivery Address: ${address}</p >
    <p>Cost : ${params[3]}</p>
    <p>Delivery Charges : ${params[4]}</p>
    <p>Total : ${params[5]}</p>`
  },
  orderTemplate(params) {
    return `< h1 > Order Status</h1 >
            <p>Your order ${params[0]} is ${params[1]}</p>`
  },
  orderText(params) {
    return `< h1 > Order status</h1 >
            <p>Your orders ${params[0]} is ${params[1]} <p>`
  },
  resetPasswordTemplate(params) {
    return `<h1 > Reset Password</h1 >
                <p>Follow the link to reset password ${process.env.RESET_PASSWORD_LINK}${params[0]}</p>`
  },
  resetPasswordText(params) {
    return `<h1>Reset Password </h1>
                <p>Follow the link to reset password ${process.env.RESET_PASSWORD_LINK} ${params[0]} </p>`
  }
}
