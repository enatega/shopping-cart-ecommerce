import React, { useContext } from 'react'
import { View } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'
import {
  BottomTab,
  BackHeader,
  Spinner,
  TextError,
  TextDefault
} from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserContext from '../../context/User'
import { colors, scale, alignment } from '../../utils'

function TrackOrder(props) {
  const navigation = useNavigation()
  const route = useRoute()
  const id = route.params?._id ?? null
  const { loadingOrders, orders, errorOrders } = useContext(UserContext)
  const order = orders.find(o => o._id === id)

  function formatDate(date) {
    return new Date(date).toUTCString()
    // return '13:32, Nov 05,2018'
  }

  const transformStatusQueue = statusQueue => {
    console.log(statusQueue)
    let timeline = []
    if (statusQueue.cancelled) {
      timeline = [
        {
          circleColor: colors.colorPrimary100,
          lineColor: colors.colorPrimary100,
          title: 'Pending',
          description: statusQueue.pending
            ? formatDate(statusQueue.pending)
            : ''
        },
        {
          circleColor: colors.colorPrimary100,
          title: 'Cancelled',
          description: statusQueue.cancelled
            ? formatDate(statusQueue.cancelled)
            : 'Not cancelled'
        }
      ]
    } else {
      timeline = [
        {
          circleColor: colors.colorPrimary100,
          lineColor: statusQueue.accepted
            ? colors.greenColor
            : colors.horizontalLine,
          title: 'Pending',
          description: statusQueue.pending
            ? formatDate(statusQueue.pending)
            : ''
        },
        {
          lineColor: statusQueue.dispatched
            ? colors.greenColor
            : colors.horizontalLine,
          circleColor: statusQueue.accepted
            ? colors.greenColor
            : colors.horizontalLine,
          title: 'Accepted',
          description: statusQueue.accepted
            ? formatDate(statusQueue.accepted)
            : ''
        },
        {
          lineColor: statusQueue.delivered
            ? colors.greenColor
            : colors.horizontalLine,
          circleColor: statusQueue.dispatched
            ? colors.greenColor
            : colors.horizontalLine,
          title: 'Dispatched',
          description: statusQueue.dispatched
            ? formatDate(statusQueue.dispatched)
            : ''
        },
        {
          circleColor: statusQueue.delivered
            ? colors.greenColor
            : colors.horizontalLine,
          title: 'Delivered',
          description: statusQueue.delivered
            ? formatDate(statusQueue.delivered)
            : ''
        }
      ]
    }

    return timeline
  }
  function Header() {
    return (
      <>
        <View style={styles.cardContainer}>
          <TextDefault textColor={colors.fontBlue} H4 style={alignment.MBsmall}>
            {'Product Details'}
          </TextDefault>
          <View style={styles.card}>
            {order &&
              order.items.map((item, index) => (
                <View style={{ flexDirection: 'row' }} key={index}>
                  <TextDefault textColor={colors.fontSecondColor}>
                    {item.quantity}
                    {'x '}
                  </TextDefault>
                  <TextDefault
                    textColor={colors.fontSecondColor}
                    style={{ width: '95%' }}>
                    {item.product}
                  </TextDefault>
                </View>
              ))}
          </View>
        </View>
        <TextDefault
          textColor={colors.fontBlue}
          H4
          style={alignment.MBsmall}
          center>
          {'Order Status'}
        </TextDefault>
      </>
    )
  }
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.flex, styles.mainContainer]}>
        <BackHeader
          title={'Order No. ' + order?.orderId ?? '10352'}
          backPressed={() => navigation.goBack()}
        />
        {errorOrders ? (
          <TextError text={errorOrders.message} />
        ) : loadingOrders || !order ? (
          <Spinner />
        ) : (
          <>
            <View style={styles.timelineContainer}>
              <Timeline
                data={transformStatusQueue(order.statusQueue)}
                circleSize={scale(15)}
                circleColor="#8CB65E"
                showTime={false}
                innerCircle="dot"
                titleStyle={{ marginTop: -10 }}
                options={{
                  ListHeaderComponent: Header()
                }}
              />
            </View>
          </>
        )}
      </View>
      <BottomTab screen="HOME" />
    </SafeAreaView>
  )
}

export default TrackOrder
