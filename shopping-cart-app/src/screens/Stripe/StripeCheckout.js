import React, { useLayoutEffect, useContext } from 'react'
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useApolloClient, gql } from '@apollo/client'
import { stripeCurrencies } from '../../utils/currencies'
import { myOrders } from '../../apollo/server'
import getEnvVars from '../../../environment'
import UserContext from '../../context/User'

const {
  SERVER_URL,
  STRIPE_PUBLIC_KEY,
  STRIPE_IMAGE_URL,
  STRIPE_STORE_NAME
} = getEnvVars()

const MYORDERS = gql`
  ${myOrders}
`

function StripeCheckout() {
  const navigation = useNavigation()
  const client = useApolloClient()
  const route = useRoute()
  const { _id, currency, email } = route.params
  const { clearCart } = useContext(UserContext)

  const multiplier = stripeCurrencies.find(
    ({ currency: curr }) => curr === currency
  ).multiplier
  const amount = route.params.amount * multiplier
  const description = 'Shopping Cart' // find alternative to this
  const allowRememberMe = false

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      title: 'Stripe Checkout'
    })
  }, [navigation])

  function onClose(flag) {
    // showMessage here
    navigation.goBack()
  }
  async function onPaymentSuccess() {
    const result = await client.query({
      query: MYORDERS,
      fetchPolicy: 'network-only'
    })
    const order = result.data.orders.find(order => order.orderId === _id)
    await clearCart()
    navigation.reset({
      routes: [
        { name: 'MainLanding' },
        {
          name: 'OrderDetail',
          params: { _id: order._id, clearCart: true }
        }
      ]
    })
  }

  return (
    <WebView
      javaScriptEnabled={true}
      scrollEnabled={false}
      bounces={false}
      source={{
        html: `<head><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"></head><script src="https://checkout.stripe.com/checkout.js"></script>
<script>
var paymentStatus=false;
var handler = StripeCheckout.configure({
  key: '${STRIPE_PUBLIC_KEY}',
  image: '${STRIPE_IMAGE_URL}',
  locale: 'auto',
  token: function(token) {
    paymentStatus=true
    fetch('${SERVER_URL}stripe/charge?id=${_id}', {
      method: 'POST', 
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      
      body: JSON.stringify(token)
    })
      .then(response => response.json())
      .then(result => {
        if(result.redirect)
          window.location='${SERVER_URL}'+result.redirect
      })
      .catch(error => { alert(error) });
  },
});
window.onload = function() {
  handler.open({
    image: '${STRIPE_IMAGE_URL}',
    name: '${STRIPE_STORE_NAME}',
    description: '${description}',
    amount: ${amount},
    currency: '${currency}',
    allowRememberMe: ${allowRememberMe},
    email: '${email}',
    closed: function() {
      if(!paymentStatus)
      window.location='${SERVER_URL}stripe/cancel'
    }
  });
};
</script>`,
        baseUrl: Platform.OS === 'android' ? '' : `${SERVER_URL}`
      }}
      scalesPageToFit={Platform.OS === 'android'}
      onNavigationStateChange={data => {
        if (data.title === 'cancel') onClose(true)
        if (data.title === 'failed') onClose(false)
        if (data.title === 'success') onPaymentSuccess()
      }}
    />
  )
}

export default StripeCheckout
