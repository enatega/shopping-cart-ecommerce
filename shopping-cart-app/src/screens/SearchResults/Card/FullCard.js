import React, { useContext } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import { TextDefault } from '../../../components'
import { colors } from '../../../utils'
import { useNavigation } from '@react-navigation/native'
import ConfigurationContext from '../../../context/Configuration'

function FullCard(props) {
  const navigation = useNavigation()
  const configuration = useContext(ConfigurationContext)

  // render the whole content
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('ProductDescription', { product: props.product })
        }}>
        <View style={styles.container}>
          <View style={styles.leftside}>
            <Image
              style={styles.thumbnail}
              resizeMode="cover"
              source={{ uri: props.productImage }}
            />
          </View>
          <View style={styles.rightside_container}>
            <View style={styles.rightside}>
              <View style={styles.rightside_top}>
                <TextDefault
                  numberOfLines={2}
                  style={styles.product}
                  textColor={colors.fontMainColor}
                  H5>
                  {props.productName}
                </TextDefault>
              </View>
              <View style={styles.rightside_bot}>
                <View style={styles.special_row}>
                  <TextDefault
                    textColor={colors.fontBlue}
                    style={styles.amount}
                    H5>
                    {configuration.currencySymbol} {props.productNewPrice}
                  </TextDefault>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

export default FullCard
