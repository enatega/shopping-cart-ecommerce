import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'

function BackHeader(props) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity
          activeOpacity={0}
          style={styles.leftContainer}
          onPress={() => props.backPressed()}>
          <Ionicons name="ios-arrow-back" size={30} />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.headerText}>
          {props.title}
        </Text>
      </View>
    </View>
  )
}

function HeaderRightText(props) {
  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, { justifyContent: 'space-between' }]}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => props.backPressed()}>
            <Ionicons name="ios-arrow-back" size={30} />
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.headerText}>
            {props.title}
          </Text>
        </View>
        <Text style={styles.rightTitle}>New Address</Text>
      </View>
    </View>
  )
}
export { BackHeader, HeaderRightText }
