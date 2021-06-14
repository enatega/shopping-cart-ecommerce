import React, { useState } from 'react'
import { View, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import styles from './styles'
import { TextDefault, RadioButton, BackHeader } from '../../components'
import { alignment, colors } from '../../utils'
import { useNavigation, useRoute } from '@react-navigation/native'

function Payment() {
  const navigation = useNavigation()
  const route = useRoute()
  const [selectedPayment, setSelectedPayment] = useState(
    route.params?.payment ?? {},
    {}
  )
  const CASH = [
    {
      payment: 'STRIPE',
      label: 'Credit Card',
      index: 0,
      icon: require('../../assets/images/masterIcon.png'),
      icon1: require('../../assets/images/visaIcon.png')
    },
    {
      payment: 'PAYPAL',
      label: 'PayPal',
      index: 1,
      icon: require('../../assets/images/paypal.png')
    },
    {
      payment: 'COD',
      label: 'COD',
      index: 2,
      icon: require('../../assets/images/cashIcon.png')
    }
  ]
  function onSelectPayment(payment) {
    setSelectedPayment(payment)
    navigation.navigate('Checkout', { PayObject: payment })
  }
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <BackHeader title="Payment" backPressed={() => navigation.goBack()} />
      <View style={[styles.flex, styles.mainContainer]}>
        {CASH.map((item, index) => (
          <TouchableOpacity
            style={[styles.radioGroup, styles.pT20]}
            key={index.toString()}
            onPress={() => {
              onSelectPayment(item)
            }}>
            <View style={styles.radioContainer}>
              <RadioButton
                animation={'bounceIn'}
                outerColor={colors.radioOuterColor}
                innerColor={colors.radioColor}
                isSelected={selectedPayment.index === item.index}
                onPress={() => {
                  onSelectPayment(item)
                }}
              />
            </View>
            <TextDefault
              numberOfLines={1}
              textColor={colors.fontMainColor}
              style={{ width: '60%' }}>
              {item.label}
            </TextDefault>
            <View style={styles.iconContainer}>
              {item.icon1 && (
                <Image
                  resizeMode="cover"
                  style={[styles.iconStyle, { ...alignment.MRxSmall }]}
                  source={item.icon1}
                />
              )}
              <Image
                resizeMode="cover"
                style={styles.iconStyle}
                source={item.icon}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default Payment
