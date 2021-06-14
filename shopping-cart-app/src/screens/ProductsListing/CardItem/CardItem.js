import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import styles from './styles'

const cardData = [
  {
    title: 'Leather Crossbody MID',
    category: 'Bag',
    ratingOverall: 5,
    ratingNumber: 401,
    price: '34',
    img: require('../../../assets/images/ProductListing/bag.png')
  },
  {
    title: "Photographer's belt and",
    category: 'harness',
    ratingOverall: 5,
    ratingNumber: 205,
    price: '29',
    img: require('../../../assets/images/ProductListing/belt.png')
  },
  {
    title: "Photographer's belt and",
    category: 'harness',
    ratingOverall: 5,
    ratingNumber: 205,
    price: '29',
    img: require('../../../assets/images/ProductListing/belt.png')
  },
  {
    title: 'Leather Crossbody MID',
    category: 'Bag',
    ratingOverall: 5,
    ratingNumber: 401,
    price: '34',
    img: require('../../../assets/images/ProductListing/bag.png')
  }
]
const cardItem = props => (
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    }}>
    {cardData.map((data, ind) => (
      <TouchableOpacity
        activeOpacity={0}
        onPress={() => props.navigationObj.navigate('ProductDescription')}
        key={ind}
        style={styles.cardContainer}>
        <View style={styles.cardTop}>
          <Image
            source={data.img}
            resizeMode="cover"
            style={styles.imgResponsive}
          />
        </View>
        <View style={[styles.textContainer, { justifyContent: 'flex-end' }]}>
          <Text style={[styles.textStyle]}>{data.title}</Text>
        </View>
        <View
          style={[
            styles.textContainer,
            { justifyContent: 'flex-start', marginTop: -3 }
          ]}>
          <Text style={[styles.textStyle]}>{data.category}</Text>
        </View>
        <View style={[styles.botContainer, { justifyContent: 'flex-end' }]}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceStyle}>{data.price} PKR</Text>
          </View>
        </View>
      </TouchableOpacity>
    ))}
  </View>
)

export default cardItem
