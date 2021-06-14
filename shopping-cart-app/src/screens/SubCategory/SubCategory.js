import React from 'react'
import { View, FlatList, Image } from 'react-native'
import styles from './styles'
import MainBtn from '../../ui/Buttons/MainBtn'
import {
  BottomTab,
  BackHeader,
  TextDefault,
  Spinner,
  TextError
} from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { gql, useQuery } from '@apollo/client'
import { subCategories } from '../../apollo/server'
import { colors } from '../../utils'
import { useRoute, useNavigation } from '@react-navigation/native'
import SubCategoryCard from '../../ui/SubCategoryCard/SubCategoryCard'

const SUB_CATEGORIES = gql`
  ${subCategories}
`

function SubCategory(props) {
  const route = useRoute()
  const navigation = useNavigation()
  const id = route.params?.id ?? null
  const title = route.params?.title ?? null
  const {
    data: categoryData,
    loading,
    error,
    refetch,
    networkStatus
  } = useQuery(SUB_CATEGORIES, { variables: { id: id } })

  if (id === null) {
    navigation.goBack()
    return null
  }
  function emptyView() {
    return (
      <View style={styles.subContainerImage}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/noProducts.png')}></Image>
        </View>
        <View style={styles.descriptionEmpty}>
          <TextDefault textColor={colors.fontSecondColor} bold center>
            {`There are no sub categories for ${title}`}
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
  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <View style={[styles.grayBackground, styles.flex]}>
        <BackHeader
          title={title ?? 'Sub Catergories'}
          backPressed={() => props.navigation.goBack()}
        />
        {error ? (
          <TextError text={error.message} />
        ) : loading ? (
          <Spinner />
        ) : (
          <FlatList
            style={styles.flex}
            contentContainerStyle={styles.categoryContainer}
            data={categoryData ? categoryData.subCategoriesById : []}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={emptyView()}
            refreshing={networkStatus === 4}
            onRefresh={() => refetch()}
            numColumns={2}
            renderItem={({ item, index }) => (
              <SubCategoryCard
                style={styles.cardStyle}
                key={index}
                data={item}
              />
            )}
          />
        )}
        <BottomTab screen="HOME" />
      </View>
    </SafeAreaView>
  )
}
export default SubCategory
