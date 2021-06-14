import React, { useContext } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'
import BottomTab from '../../components/BottomTab/BottomTab'
import Card from './Card/AddressCard'
import { colors, alignment } from '../../utils'
import { TextDefault } from '../../components'
import UserContext from '../../context/User'
import MainBtn from '../../ui/Buttons/MainBtn'

function AddressList() {
  const navigation = useNavigation()
  const route = useRoute()
  const { profile } = useContext(UserContext)
  const cartAddress = route.params?.backScreen ?? null

  function emptyView() {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.address}>
          <TextDefault
            textColor={colors.fontMainColor}
            bold
            center
            H5
            style={alignment.MBlarge}>
            No Addresses!!
          </TextDefault>
          <TextDefault textColor={colors.fontMainColor} center small>
            {"You don't have any address registered."}
          </TextDefault>
          <TextDefault textColor={colors.fontMainColor} center small>
            Please add a new one.
          </TextDefault>
        </View>
        <View style={styles.btnContainer}>
          <MainBtn
            onPress={() =>
              navigation.navigate('NewAddress', { backScreen: cartAddress })
            }
            text="Add new address"
          />
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              activeOpacity={0}
              onPress={() => navigation.goBack()}
              style={styles.backImg}>
              <Ionicons name="ios-arrow-back" size={30} />
            </TouchableOpacity>
            <TextDefault
              textColor={colors.fontMainColor}
              style={styles.headerText}
              H4>
              My Addresses
            </TextDefault>
            <View style={styles.headerBtn}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('NewAddress', { backScreen: cartAddress })
                }
                activeOpacity={0}>
                <TextDefault textColor={colors.greenTextColor}>
                  New Address
                </TextDefault>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.main}>
            <FlatList
              style={styles.flex}
              data={profile.addresses.filter(a => a.isActive)}
              keyExtractor={item => item._id.toString()}
              ListEmptyComponent={emptyView}
              renderItem={({ item }) => (
                <Card item={item} default={item.selected} />
              )}
            />
          </View>
        </View>
        <BottomTab screen="PROFILE" />
      </View>
    </SafeAreaView>
  )
}

export default AddressList
