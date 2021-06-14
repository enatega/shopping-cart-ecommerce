import React, { useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import styles from './styles'
import SearchBar from '../../ui/SearchBar/SearchBar'
import FullCard from './Card/FullCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  BackHeader,
  TextDefault,
  BottomTab,
  Spinner,
  TextError
} from '../../components'
import { colors } from '../../utils'
import { useQuery, gql } from '@apollo/client'
import { produccts } from '../../apollo/server'

const PRODUCTS_DATA = gql`
  ${produccts}
`

function SearchResults(props) {
  const [search, setSearch] = useState('')
  const { data, loading, error } = useQuery(PRODUCTS_DATA)

  const searchProducts = searchText => {
    const productData = []
    // console.log('Searched Products',productData)
    data.products.forEach(product => {
      const regex = new RegExp(
        searchText.replace(/[\\[\]()+?.*]/g, c => '\\' + c),
        'i'
      )
      const result = product.title.search(regex)

      if (result > -1 && productData.indexOf(product) === -1) {
        productData.push(product)
      }
      const resultSubCategory = product.subCategory.title.search(regex)
      console.log('sub category', resultSubCategory)
      if (resultSubCategory > -1 && productData.indexOf(product) === -1) {
        console.log('product result', product.title, resultSubCategory)
        productData.push(product)
      }
    })
    return productData
  }

  function renderSearchResult() {
    return (
      <View style={styles.mainBody}>
        <View style={styles.mixed_text}>
          {
            <TextDefault textColor={colors.fontSecondColor} H5>
              {search ? searchProducts(search).length : 0}
              {' results found for: '} {search}
            </TextDefault>
          }
        </View>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {!!search &&
            searchProducts(search).map((item, i) => (
              <FullCard
                productImage={item.image[0]}
                productName={item.title}
                productNewPrice={item.price}
                product={item}
                key={i}
              />
            ))}
        </ScrollView>
      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <BackHeader
          title="Search"
          backPressed={() => props.navigation.goBack()}
        />
        <View style={[styles.body]}>
          <View style={[styles.main]}>
            <View style={styles.searchBarContainer}>
              <SearchBar
                onChange={e => {
                  setSearch(e.nativeEvent.text.trim())
                }}
                placeholderText={'Search'}
              />
            </View>
            <View style={styles.mainBodyContainer}>
              {error ? (
                <TextError text={error.message} />
              ) : loading ? (
                <Spinner />
              ) : (
                renderSearchResult()
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <BottomTab screen="SEARCH" />
    </SafeAreaView>
  )
}

export default SearchResults
