import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import styles from './styles'
import {
  BackHeader,
  BottomTab,
  FlashMessage,
  TextDefault,
  TextError
} from '../../components'
import ShoppingCard from './ShoppingCard/ShoppingCard'
import BlueBtn from '../../ui/Buttons/BlueBtn'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { gql, useApolloClient } from '@apollo/client'
import ConfigurationContext from '../../context/Configuration'
import UserContext from '../../context/User'
import { productById } from '../../apollo/server'
import { colors } from '../../utils'
import MainBtn from '../../ui/Buttons/MainBtn'

const PRODUCT_BY_IDS = gql`
  ${productById}
`

function ShoppingCart(props) {
  const client = useApolloClient()
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const configuration = useContext(ConfigurationContext)
  const {
    cart,
    updateCart,
    addQuantity: addQuantityContext,
    removeQuantity
  } = useContext(UserContext)
  const [products, setProducts] = useState([])
  // const setLoadingData = useState(true)[1]

  useEffect(() => {
    didFocus()
  }, [])

  async function didFocus() {
    try {
      if (cart && cart.length) {
        const ids = cart.map(({ _id }) => _id)
        const {
          data: { productByIds }
        } = await client.query({
          query: PRODUCT_BY_IDS,
          variables: { ids },
          fetchPolicy: 'network-only'
        })

        const transformCart = cart.map(cartItem => {
          const product = productByIds.find(
            product => product._id === cartItem._id
          )
          if (!product) return null
          return {
            ...cartItem,
            image: product.image[0],
            price: parseFloat(cartItem.price).toFixed(2),
            subCategory:
              product.subCategory.title +
              ' / ' +
              product.subCategory.category.title
          }
        })
        if (isFocused) {
          await updateCart(transformCart.filter(item => item))
          setProducts(productByIds)
          // setLoadingData(false)
        } else {
          if (navigation.isFocused) {
            // setLoadingData(false)
          }
        }
      }
    } catch (error) {
      // setLoadingData(false)
      return <TextError text={error.message} />
    }
  }

  async function checkStock(cartData) {
    let stockCheck = true
    const product = products.find(p => p._id === cartData._id)
    if (product) {
      cartData.selectedAttributes.forEach(item => {
        const attribute = product.attributes.find(
          data => data.attributeId === item.attributeId
        )

        if (!attribute) stockCheck = false
        const option = attribute.options.find(
          op => op.optionId === item.option.optionId
        )
        if (!option) stockCheck = false
        if (!option.stock) stockCheck = false
        if (option.stock > cartData.quantity) {
          stockCheck = true
        } else {
          stockCheck = false
        }
      })
    }
    return stockCheck
  }

  async function addQuantity(key) {
    const cartData = cart.find(c => c.key === key)
    if (cartData) {
      const check = await checkStock(cartData)
      if (check) {
        await addQuantityContext(key)
      } else {
        FlashMessage({
          message: 'No more items in stock'
        })
      }
    }
  }

  function empty() {
    return (
      <View style={styles.subContainerImage}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/activeOrder.png')}></Image>
        </View>
        <View style={styles.descriptionEmpty}>
          <TextDefault textColor={colors.fontSecondColor} bold center>
            {'There is no item in the cart.'}
          </TextDefault>
        </View>
        <View style={styles.emptyButton}>
          <MainBtn
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('MainLanding')}
            text="Browse Product"
          />
        </View>
      </View>
    )
  }

  function calculatePrice(deliveryCharges = 0) {
    let itemTotal = 0
    cart.forEach(cartItem => {
      if (!cartItem.price) {
        return
      }
      itemTotal += cartItem.price * cartItem.quantity
    })
    return (itemTotal + deliveryCharges).toFixed(2)
  }

  function PriceContainer() {
    return (
      <View style={styles.priceBox}>
        <View style={styles.summaryContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textStyle}>Sub Total</Text>
            <Text style={styles.textStyle}>
              {configuration.currencySymbol} {calculatePrice(0)}
            </Text>
          </View>
          <View style={styles.spacer} />
          <View style={styles.rowContainer}>
            <Text style={styles.textStyle}>Delivery</Text>
            <Text style={styles.textStyle}>
              {configuration.currencySymbol}{' '}
              {parseFloat(configuration.deliveryCharges).toFixed(2)}
            </Text>
          </View>
          <View style={styles.spacer} />
          <View style={styles.lineStyle} />
          <View style={styles.spacer} />
          <View style={styles.rowContainer}>
            <Text style={styles.textStyle}>Total</Text>
            <Text style={[styles.textStyle, styles.totalStyle]}>
              {configuration.currencySymbol}{' '}
              {calculatePrice(configuration.deliveryCharges)}
            </Text>
          </View>
          <View style={styles.spacer} />
          <BlueBtn
            onPress={() => navigation.navigate('Checkout')}
            text="Proceed"
          />
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.flex, styles.mainContainer]}>
        <BackHeader title="Cart" backPressed={() => navigation.goBack()} />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <FlatList
            data={cart || []}
            style={styles.flex}
            keyExtractor={item => item.key}
            ListEmptyComponent={empty()}
            contentContainerStyle={styles.subContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ShoppingCard
                key={item.key}
                item={item}
                quantity={item.quantity}
                price={(parseFloat(item.price) * item.quantity).toFixed(2)}
                addQuantity={() => {
                  addQuantity(item.key)
                }}
                removeQuantity={() => {
                  removeQuantity(item.key)
                }}
              />
            )}
          />
          {!!cart.length && <PriceContainer />}
        </View>
        <BottomTab screen="CART" />
      </View>
    </SafeAreaView>
  )
}
export default ShoppingCart
