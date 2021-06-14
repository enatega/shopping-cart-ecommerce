import React, { useContext } from 'react'
import { View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'
import {
  BackHeader,
  BottomTab,
  Spinner,
  TextDefault,
  TextError
} from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserContext from '../../context/User'
import ConfigurationContext from '../../context/Configuration'
import { colors, alignment } from '../../utils'
import MainBtn from '../../ui/Buttons/MainBtn'

function OrderDetail(props) {
  const navigation = useNavigation()
  const route = useRoute()
  const id = route.params?._id ?? null
  const { orders, loadingOrders, errorOrders } = useContext(UserContext)
  const configuration = useContext(ConfigurationContext)
  const order = orders.find(o => o._id === id)

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={styles.flex}>
        <BackHeader
          title={order ? order.orderId ?? 'Order Detail' : 'Order Detail'}
          backPressed={() => navigation.goBack()}
        />
        {errorOrders ? (
          <TextError text={errorOrders} />
        ) : loadingOrders || !order ? (
          <Spinner />
        ) : (
          <ScrollView
            style={[styles.itemContainer, styles.flex]}
            showsVerticalScrollIndicator={false}>
            {order.items.length &&
              order.items.map(data => {
                return (
                  <View key={data._id} style={styles.cardContainer}>
                    <View style={styles.card}>
                      <View style={styles.cardLeftContainer}>
                        <Image
                          source={{
                            uri:
                              data.image ??
                              'https://res.cloudinary.com/ecommero/image/upload/v1597658445/products/su6dg1ufmtfuvrjbhgtj.png'
                          }}
                          style={styles.imgResponsive}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={styles.cardRightContainer}>
                        <TextDefault
                          numberOfLines={1}
                          textColor={colors.fontMainColor}
                          H5>
                          {data.product}
                        </TextDefault>
                        <View style={styles.amountContainer}>
                          <View style={styles.quantityContainer}>
                            <TextDefault textColor={colors.fontThirdColor}>
                              x{data.quantity}
                            </TextDefault>
                          </View>
                          <View style={styles.priceContainer}>
                            <TextDefault
                              textColor={colors.fontSecondColor}
                              right
                              style={alignment.PRxSmall}>
                              {configuration.currencySymbol}{' '}
                              {(data.price * data.quantity).toFixed(2)}
                            </TextDefault>
                          </View>
                          {!data.isReviewed &&
                            order.orderStatus === 'DELIVERED' && (
                            <TouchableOpacity
                              activeOpacity={1}
                              style={styles.actionContainer}
                              onPress={() =>
                                navigation.navigate('Review', {
                                  product: data.productId,
                                  order: order._id
                                })
                              }>
                              <TextDefault textColor={colors.white} H5>
                                {'Review'}
                              </TextDefault>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                )
              })}
            <View style={styles.line} />
            <View style={styles.deliverContainer}>
              <View style={styles.deliverSubContainer}>
                <TextDefault
                  textColor={colors.fontBrown}
                  H4
                  style={alignment.PBxSmall}>
                  {'Deliver to'}
                </TextDefault>
                <TextDefault textColor={colors.fontThirdColor}>
                  {order.user.name}
                </TextDefault>
                <TextDefault textColor={colors.fontThirdColor}>
                  {order.user.email}
                </TextDefault>
                <TextDefault textColor={colors.fontThirdColor}>
                  {order.user.phone}
                </TextDefault>
                <View style={styles.line} />
                <TextDefault textColor={colors.fontSecondColor}>
                  {order.deliveryAddress.region}
                </TextDefault>
                <TextDefault textColor={colors.fontSecondColor}>
                  {order.deliveryAddress.city}
                </TextDefault>
                <TextDefault textColor={colors.fontSecondColor}>
                  {order.deliveryAddress.apartment},{' '}
                  {order.deliveryAddress.building}
                </TextDefault>
                {!!order.deliveryAddress.details && (
                  <TextDefault textColor={colors.fontSecondColor}>
                    {order.deliveryAddress.details}
                  </TextDefault>
                )}
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.paymentContainer}>
              <View style={styles.paymentSubContainer}>
                <TextDefault textColor={colors.fontBrown} H4>
                  {'Payment'}
                </TextDefault>
                <View style={styles.twoItems}>
                  <TextDefault textColor={colors.fontThirdColor}>
                    {'Payment Method'}
                  </TextDefault>
                  <TextDefault textColor={colors.fontMainColor}>
                    {order.paymentMethod}
                  </TextDefault>
                </View>
                <View style={styles.twoItems}>
                  <TextDefault textColor={colors.fontThirdColor}>
                    {'Delivery'}
                  </TextDefault>
                  <TextDefault textColor={colors.fontMainColor}>
                    {configuration.currencySymbol}{' '}
                    {parseFloat(configuration.deliveryCharges).toFixed(2)}
                  </TextDefault>
                </View>
                <View style={styles.twoItems}>
                  <TextDefault textColor={colors.fontThirdColor}>
                    {'Sub Total'}
                  </TextDefault>
                  <TextDefault textColor={colors.fontMainColor}>
                    {configuration.currencySymbol}{' '}
                    {parseFloat(
                      order.orderAmount - configuration.deliveryCharges
                    ).toFixed(2)}
                  </TextDefault>
                </View>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.totalContainer}>
              <View style={styles.totalSubContainer}>
                <View style={styles.twoItems}>
                  <TextDefault textColor={colors.fontMainColor} H4>
                    {'Total'}
                  </TextDefault>
                  <TextDefault textColor={colors.fontMainColor} H4>
                    {configuration.currencySymbol}{' '}
                    {parseFloat(order.orderAmount).toFixed(2)}
                  </TextDefault>
                </View>
              </View>
            </View>
            <View style={styles.trackOrderContainer}>
              <View style={styles.trackOrderSubContainer}>
                <MainBtn
                  style={styles.buttonText}
                  onPress={() => navigation.navigate('TrackOrder', { _id: id })}
                  text="Track Order"
                />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      <BottomTab screen="HOME" />
    </SafeAreaView>
  )
}

export default OrderDetail
