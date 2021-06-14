import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { Rating } from 'react-native-ratings'
import styles from './styles'
import { verticalScale } from '../../../utils/scaling'

/* Config/Constants
============================================================================= */

/* =============================================================================
<FullCard />
--------------------------------------------------------------------------------
Props:
  ?
// ImageURL is currently a placeholder add URI functionality on DYS basis
productName - Name of the product
productRating - 1-5 stars rating
productTotalVotes - total amount of users that voted
productPrevPrice - Previous price of unit, if null wont be showed
productNewPrice - Current Price of the unit
productBagde - Is it new product?
productImageURI - URI of the image - DYS basis
============================================================================= */
function FullCard(props) {
  let renderPreviousAmount = null
  let badge = null
  function renderPrevousPrice(amount) {
    return (
      <Text
        includeFontPadding={false}
        textAlignVertical="bottom"
        style={styles.prevPriceText}>
        {amount} PKR
      </Text>
    )
  }

  // if product is new
  function renderBadge() {
    return <Text style={styles.badge}>New</Text>
  }
  function renderPreviousPage() {
    if (props.productPreviousPrice) {
      renderPreviousAmount = renderPrevousPrice(props.productPreviousPrice)
    }

    if (props.productBadge) {
      badge = renderBadge()
    }
  }
  // render the whole content
  return (
    <>
      {renderPreviousPage()}
      <View style={styles.container}>
        <View style={styles.leftside}>
          <Image
            style={styles.thumbnail}
            resizeMode="cover"
            source={props.productImage}
          />
          {badge}
        </View>
        <View style={styles.rightside_container}>
          <View style={styles.rightside}>
            <View style={styles.rightside_top}>
              <Text style={styles.product} numberOfLines={2}>
                {props.productName}
              </Text>
              <View style={styles.ratingContainer}>
                <Rating
                  isDisabled
                  ratingCount={5}
                  startingValue={props.productRating}
                  imageSize={verticalScale(14)}
                />
                <Text style={styles.votesCount}>{props.productTotalVotes}</Text>
              </View>
            </View>
            <View style={styles.rightside_bot}>
              {renderPreviousAmount}
              <View style={styles.special_row}>
                <Text style={styles.amount}>{props.productNewPrice} PKR</Text>
                <TouchableOpacity
                  activeOpacity={0}
                  onPress={() => {
                    console.log('Go to Cart')
                  }}>
                  <Image
                    style={{
                      width: verticalScale(16),
                      height: verticalScale(16)
                    }}
                    source={require('../../../assets/icons/shopcart.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default FullCard
