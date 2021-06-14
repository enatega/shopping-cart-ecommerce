import React, { useState, useEffect, useContext } from 'react'
import { View, Image, ScrollView, TouchableOpacity } from 'react-native'
import styles from './styles'
import { verticalScale, colors, alignment, scale } from '../../utils'
import BlueBtn from '../../ui/Buttons/BlueBtn'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  BackHeader,
  BottomTab,
  TextDefault,
  FlashMessage,
  Spinner
} from '../../components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AntDesign, Feather } from '@expo/vector-icons'
import UserContext from '../../context/User'
import ConfigurationContext from '../../context/Configuration'
import { stripeCurrencies, paypalCurrencies } from '../../utils/currencies'
import { useMutation, gql } from '@apollo/client'
import { placeOrder, getCoupon } from '../../apollo/server'
import TextField from '../../ui/Textfield/Textfield'
import MainBtn from '../../ui/Buttons/MainBtn'

const PLACEORDER = gql`
  ${placeOrder}
`
const GET_COUPON = gql`
  ${getCoupon}
`
/* Config/Constants
============================================================================= */

const COD_PAYMENT = {
  payment: 'COD',
  label: 'COD',
  index: 2,
  icon: require('../../assets/images/cashIcon.png')
}

function Checkout() {
  const route = useRoute()
  const navigation = useNavigation()
  const payObj = route.params ? route.params.PayObject : null
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [coupan, setCoupan] = useState(null)
  const [coupanError, setCoupanError] = useState(null)
  const [discount, setDiscount] = useState(0)
  const configuration = useContext(ConfigurationContext)
  const { isLoggedIn, cart, profile, loadingProfile, clearCart } = useContext(
    UserContext
  )

  const [mutate] = useMutation(GET_COUPON, {
    onCompleted,
    onError
  })

  const [mutateOrder, { loading: loadingOrderMutation }] = useMutation(
    PLACEORDER,
    {
      onCompleted: placeOrderCompleted,
      onError: errorPlaceOrder
    }
  )

  useEffect(() => {
    setPaymentMethod(payObj || COD_PAYMENT)
  }, [payObj])

  const address =
    isLoggedIn && profile.addresses
      ? profile.addresses.filter(a => a.selected)[0]
      : null

  function applyCoupan() {
    mutate({ variables: { coupon: coupan } })
  }

  function onCompleted({ coupon }) {
    if (coupon) {
      if (coupon.enabled) {
        setDiscount(coupon.discount)
        setCoupan(coupon.code)

        FlashMessage({ message: 'Coupon Applied', type: 'success' })
      } else {
        setDiscount(0)
        setCoupan(null)
        setCoupanError('Invalid')
        FlashMessage({ message: 'Coupon Failed', type: 'warning' })
      }
    }
  }

  function onError() {
    setDiscount(0)
    setCoupan(null)
    setCoupanError('Invalid')
    FlashMessage({ message: 'Invalid Coupon', type: 'warning' })
  }

  function validateOrder() {
    if (!cart.length) {
      FlashMessage({ message: 'Cart is empty !', type: 'warning' })
      return false
    }
    if (!address) {
      FlashMessage({
        message: 'Set delivery address before checkout',
        type: 'warning'
      })
      navigation.navigate('AddressList', { backScreen: 'Cart' })
      return false
    }
    if (!paymentMethod) {
      FlashMessage({
        message: 'Set payment method before checkout',
        type: 'warning'
      })
      return false
    }
    if (profile.phone.length < 1) {
      navigation.navigate('EditingProfile', { backScreen: 'Cart' })
      return false
    }
    return true
  }

  function checkPaymentMethod(currency) {
    if (paymentMethod.payment === 'STRIPE') {
      return stripeCurrencies.find(val => val.currency === currency)
    }
    if (paymentMethod.payment === 'PAYPAL') {
      return paypalCurrencies.find(val => val.currency === currency)
    }
    return true
  }

  function transformOrder(cartData) {
    return cartData.map(product => {
      return {
        productId: product._id,
        product: product.product,
        quantity: product.quantity,
        image: product.image,
        selectedAttributes: product.selectedAttributes,
        price: parseFloat(product.price)
      }
    })
  }

  async function onPayment() {
    if (checkPaymentMethod(configuration.currency)) {
      const Items = transformOrder(cart)
      // console.log('Items', JSON.stringify(Items))
      mutateOrder({
        variables: {
          orderInput: Items,
          paymentMethod: paymentMethod.payment,
          couponCode: coupan,
          address: {
            label: address.label,
            region: address.region,
            city: address.city,
            apartment: address.apartment,
            building: address.building,
            details: address.details
          }
        }
      })
    } else {
      FlashMessage({
        message: 'Payment not supported yet!',
        type: 'warning'
      })
    }
  }
  async function clear() {
    await clearCart()
  }

  function placeOrderCompleted(data) {
    if (paymentMethod.payment === 'COD') {
      clear()
      navigation.reset({
        routes: [
          { name: 'MainLanding' },
          {
            name: 'OrderDetail',
            params: { _id: data.placeOrder._id, clearCart: true }
          }
        ]
      })
    } else if (paymentMethod.payment === 'PAYPAL') {
      navigation.replace('Paypal', {
        _id: data.placeOrder.orderId,
        currency: configuration.currency
      })
    } else if (paymentMethod.payment === 'STRIPE') {
      navigation.replace('StripeCheckout', {
        _id: data.placeOrder.orderId,
        amount: data.placeOrder.orderAmount,
        email: data.placeOrder.user.email,
        currency: configuration.currency
      })
    }
  }
  function errorPlaceOrder(error) {
    console.log('error', JSON.stringify(error))
    FlashMessage({ message: JSON.stringify(error), type: 'warning' })
  }

  function calculatePrice(deliveryCharges = 0, withDiscount) {
    let itemTotal = 0
    cart.forEach(cartItem => {
      if (!cartItem.price) {
        return
      }
      itemTotal += cartItem.price * cartItem.quantity
    })
    if (withDiscount && discount) {
      itemTotal = itemTotal - (discount / 100) * itemTotal
    }
    return (itemTotal + deliveryCharges).toFixed(2)
  }

  function renderItem(item, index) {
    return (
      <View key={index} style={styles.listItem}>
        <View style={styles.productRow}>
          <TextDefault textColor={colors.fontBlue}>
            {item.quantity}x{' '}
          </TextDefault>
          <TextDefault textColor={colors.fontSecondColor}>
            {item.product}
          </TextDefault>
        </View>
        <TextDefault
          textColor={colors.fontBlue}
          style={{ maxWidth: '15%' }}
          center>
          {configuration.currencySymbol} {item.price * item.quantity}
        </TextDefault>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.flex, styles.mainContainer]}>
        <BackHeader title="Summary" backPressed={() => navigation.goBack()} />
        {loadingProfile ? (
          <Spinner />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.flex}
            contentContainerStyle={styles.container}>
            <View style={styles.body}>
              <View style={styles.main_top}>
                <View style={[styles.orders, styles.line]}>
                  <View style={styles.row}>
                    <TextDefault textColor={colors.fontBrown} H5>
                      {'My Orders'}
                    </TextDefault>
                    <TouchableOpacity
                      activeOpacity={0}
                      onPress={() => navigation.goBack()}>
                      <Feather
                        name="edit"
                        size={scale(18)}
                        color={colors.fontPlaceholder}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.simpleRow, styles.padding]}>
                    <Image
                      source={require('../../assets/icons/delivery.png')}
                      style={{
                        height: verticalScale(13),
                        width: verticalScale(25)
                      }}
                    />
                    <TextDefault
                      textColor={colors.fontBlue}
                      style={styles.deliveryDate}>
                      {' Delivery Expected : 3-4 days'}
                    </TextDefault>
                  </View>
                  {!!cart && cart.length > 0 && (
                    <View style={styles.items}>
                      {cart.map((item, index) => renderItem(item, index))}
                    </View>
                  )}
                </View>
                {isLoggedIn && (
                  <>
                    <View style={[styles.coupan, styles.line]}>
                      <TextDefault textColor={colors.fontBrown} H5>
                        {'Coupon'}
                      </TextDefault>
                      <View style={styles.coupanRow}>
                        <View style={styles.coupanInput}>
                          <TextField
                            error={coupanError}
                            value={coupan}
                            placeholder="Coupon"
                            onChange={event => {
                              setCoupan(event.nativeEvent.text.trim())
                            }}
                          />
                        </View>
                        {!coupanError && discount > 0 ? (
                          <MainBtn
                            style={styles.coupanBtn}
                            onPress={() => {
                              if (coupan) {
                                setCoupan(null)
                                setCoupanError(null)
                                setDiscount(0)
                              }
                            }}
                            text={'Remove'}
                          />
                        ) : (
                          <MainBtn
                            style={styles.coupanBtn}
                            onPress={() => {
                              if (!coupan) setCoupanError('Invalid')
                              else {
                                setCoupanError(null)
                                applyCoupan()
                              }
                            }}
                            text={'Apply'}
                          />
                        )}
                      </View>
                    </View>
                    <TouchableOpacity
                      style={[styles.address, styles.line]}
                      onPress={() => {
                        isLoggedIn &&
                          navigation.navigate('AddressList', {
                            backScreen: 'Cart'
                          })
                      }}>
                      <TextDefault textColor={colors.fontBrown} H5>
                        {'Deliver to'}
                      </TextDefault>
                      <View style={styles.addressDetail}>
                        <TextDefault textColor={colors.fontSecondColor}>
                          {profile.name}
                        </TextDefault>
                        <TextDefault textColor={colors.fontSecondColor}>
                          {profile.email}
                        </TextDefault>
                        <TextDefault textColor={colors.fontSecondColor}>
                          {profile.phone}
                        </TextDefault>
                      </View>
                      {address ? (
                        <View style={styles.borderBottom}>
                          <View style={styles.row}>
                            <TextDefault textColor={colors.fontMainColor}>
                              {address.region}
                            </TextDefault>
                            <Feather
                              name="edit"
                              size={scale(15)}
                              color={colors.fontThirdColor}
                            />
                          </View>
                          <TextDefault textColor={colors.fontMainColor}>
                            {address.city},
                          </TextDefault>
                          <TextDefault textColor={colors.fontMainColor}>
                            {address.apartment}, {address.building}
                          </TextDefault>
                          {!!address.details && (
                            <TextDefault textColor={colors.fontMainColor}>
                              {address.details}
                            </TextDefault>
                          )}
                        </View>
                      ) : (
                        <View style={styles.borderBottom}>
                          <View style={styles.row}>
                            <TextDefault textColor={colors.fontMainColor}>
                              Select Address
                            </TextDefault>
                            <Feather
                              name="edit"
                              size={scale(15)}
                              color={colors.fontThirdColor}
                            />
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>
                    <View style={styles.dealContainer}>
                      <View style={[styles.floatView]}>
                        <TextDefault
                          textColor={colors.fontSecondColor}
                          style={{ width: '70%' }}>
                          {'Payment Method'}
                        </TextDefault>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={styles.changeText}
                          onPress={() =>
                            navigation.navigate('Payment', {
                              payment: paymentMethod
                            })
                          }>
                          <TextDefault
                            textColor={colors.buttonBackground}
                            right>
                            {'Change'}
                          </TextDefault>
                        </TouchableOpacity>
                      </View>
                      {paymentMethod === null ? (
                        <TouchableOpacity
                          style={styles.floatView}
                          onPress={() =>
                            navigation.navigate('Payment', {
                              payment: paymentMethod
                            })
                          }>
                          <AntDesign
                            name="plus"
                            size={scale(20)}
                            color={colors.buttonBackground}
                          />
                          <TextDefault
                            textColor={colors.buttonBackground}
                            style={[alignment.PLsmall, { width: '70%' }]}>
                            {'Payment Method'}
                          </TextDefault>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.floatView}
                          onPress={() =>
                            navigation.navigate('Payment', {
                              payment: paymentMethod
                            })
                          }>
                          <View style={{ width: '10%' }}>
                            <Image
                              resizeMode="cover"
                              style={styles.iconStyle}
                              source={paymentMethod.icon}
                            />
                          </View>
                          <TextDefault
                            textColor={colors.buttonBackground}
                            style={[alignment.PLsmall, { width: '90%' }]}>
                            {paymentMethod.label}
                          </TextDefault>
                        </TouchableOpacity>
                      )}
                    </View>
                  </>
                )}
              </View>

              <View style={styles.main_bot}>
                <View style={[styles.subtotal_container, styles.line]}>
                  <View style={styles.row}>
                    <TextDefault textColor={colors.fontSecondColor} H5>
                      {'Sub Total'}
                    </TextDefault>
                    <TextDefault textColor={colors.fontMainColor} H5>
                      {configuration.currencySymbol} {calculatePrice(0, false)}
                    </TextDefault>
                  </View>
                  <View style={styles.row}>
                    <TextDefault textColor={colors.fontSecondColor} H5>
                      {'Delivery'}
                    </TextDefault>
                    <TextDefault textColor={colors.fontMainColor} H5>
                      {configuration.currencySymbol}{' '}
                      {parseFloat(configuration.deliveryCharges).toFixed(2)}
                    </TextDefault>
                  </View>
                  <View style={styles.row}>
                    <TextDefault textColor={colors.fontSecondColor} H5>
                      {'Discount'}
                    </TextDefault>
                    <TextDefault textColor={colors.fontMainColor} H5>
                      {'-'}
                      {configuration.currencySymbol}{' '}
                      {parseFloat(
                        calculatePrice(0, false) - calculatePrice(0, true)
                      ).toFixed(2)}
                    </TextDefault>
                  </View>
                </View>
                <View style={styles.total_container}>
                  <View style={styles.row}>
                    <TextDefault
                      textColor={colors.fontMainColor}
                      H5
                      style={styles.text_bold}>
                      {'Total'}
                    </TextDefault>
                    <TextDefault textColor={colors.fontBlue} H5 bold>
                      {configuration.currencySymbol}{' '}
                      {calculatePrice(configuration.deliveryCharges, true)}
                    </TextDefault>
                  </View>
                </View>
                <View style={styles.submit_container}>
                  {isLoggedIn ? (
                    <BlueBtn
                      loading={loadingOrderMutation}
                      onPress={() => {
                        // navigation.navigate('OrderDetail')
                        if (validateOrder()) onPayment()
                      }}
                      text="Order Now"
                    />
                  ) : (
                    <BlueBtn
                      onPress={() =>
                        navigation.navigate('SignIn', { backScreen: 'Cart' })
                      }
                      text="Login/Create Account"
                    />
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      <BottomTab screen="CART" />
    </SafeAreaView>
  )
}

export default Checkout
