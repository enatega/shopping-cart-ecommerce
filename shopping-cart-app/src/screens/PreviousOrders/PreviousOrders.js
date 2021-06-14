import React, { useContext, useEffect } from 'react'
import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import BottomTab from '../../components/BottomTab/BottomTab'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackHeader } from '../../components/Headers/Headers'
import { useNavigation } from '@react-navigation/native'
import { TextDefault, Spinner, TextError } from '../../components'
import { colors, scale } from '../../utils'
import { Feather } from '@expo/vector-icons'
import UserContext from '../../context/User'
import MainBtn from '../../ui/Buttons/MainBtn'

function PreviousOrder(props) {
  const navigation = useNavigation()
  const {
    orders,
    loadingOrders,
    errorOrders,
    fetchOrders,
    fetchMoreOrdersFunc,
    networkStatusOrders
  } = useContext(UserContext)

  useEffect(() => {
    didFocus()
  }, [])

  async function didFocus() {
    if (orders && orders.length) {
    }
  }

  function emptyView() {
    if (loadingOrders) return <Spinner />
    if (errorOrders) return <TextError text={errorOrders.message} />
    return (
      <View style={styles.subContainerImage}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/product.png')}></Image>
        </View>
        <View style={styles.descriptionEmpty}>
          <TextDefault textColor={colors.fontMainColor} bold center>
            {'No Past Orders Yet.'}
          </TextDefault>
          <TextDefault textColor={colors.fontThirdColor} center>
            {
              "You don't have any past order yet. Try our products and your previous completed orders will show here"
            }
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

  function SectionCard({ card }) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('OrderDetail', { _id: card._id })}
        style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          <Image
            source={{
              uri:
                card.items[0].image ??
                'https://res.cloudinary.com/ecommero/image/upload/v1597658445/products/su6dg1ufmtfuvrjbhgtj.png'
            }}
            resizeMode="cover"
            style={[styles.imgResponsive, styles.roundedBorder]}
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.subRightContainer}>
            <View style={styles.titleContainer}>
              <TextDefault
                style={styles.font}
                numberOfLines={1}
                textColor={colors.fontMainColor}
                H5>
                {card.orderId}
              </TextDefault>
              <Feather
                name="chevron-right"
                size={scale(20)}
                color={colors.fontSecondColor}
              />
            </View>
            <View style={styles.subTitleContainer}>
              <TextDefault
                numberOfLines={3}
                textColor={colors.fontThirdColor}
                small>
                {card.items[0].product}
              </TextDefault>
            </View>
            <View style={styles.subActionsContainer}>
              <TextDefault textColor={colors.fontBlue} H5>
                {card.orderStatus}
              </TextDefault>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.flex, styles.mainContainer]}>
        <BackHeader
          title="Previous Orders"
          backPressed={() => navigation.goBack()}
        />
        <FlatList
          style={styles.flex}
          contentContainerStyle={styles.mainCardContainer}
          data={
            loadingOrders || errorOrders
              ? []
              : orders.filter(o => ['DELIVERED'].includes(o.orderStatus))
          }
          ListEmptyComponent={emptyView()}
          keyExtractor={(item, index) => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={networkStatusOrders === 4}
          onRefresh={() => networkStatusOrders === 7 && fetchOrders()}
          ItemSeparatorComponent={() => (
            <View style={styles.lineSubContainer} />
          )}
          renderItem={({ item }) => <SectionCard key={item._id} card={item} />}
          onEndReached={fetchMoreOrdersFunc}
        />
      </View>
      <BottomTab screen="HOME" />
    </SafeAreaView>
  )
}

export default PreviousOrder
