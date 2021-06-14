import React, { useState, useEffect, useRef } from 'react'
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Label
} from 'reactstrap'
import { withTranslation } from 'react-i18next'
import {
  subCategories,
  getAttributesByCategory,
  createProduct,
  getProducts,
  editProduct
} from '../../apollo/server'
import { validateFunc } from '../../constraints/constraints'
import Loader from 'react-loader-spinner'
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client'

import classNames from 'classnames'
import MultiImageInput from 'react-multiple-image-input'

import { cloudinary_upload_url as cloudinaryUploadUrl, cloudinary_products as cloudinaryProducts } from '../../config/config'

const GET_CATEGORIES = gql`
  ${subCategories}
`

const GET_PRODUCTS = gql`
  ${getProducts}
`

const GET_ATTRIBUTES = gql`
  ${getAttributesByCategory}
`

const CREATE_PRODUCT = gql`
  ${createProduct}
`
const EDIT_PRODUCT = gql`
  ${editProduct}
`

function Product(props) {
  const formRef = useRef()
  const product = props.product ? props.product : null
  const category = product ? product.subCategory._id : null
  const productTitle = product ? product.title : ''
  const productCode = product ? product.skuCode : ''
  const description = product ? product.description : ''
  const mainPrice = product ? product.price : ''
  const isFeatured = product ? product.featured : false
  const mutation = props.product ? EDIT_PRODUCT : CREATE_PRODUCT
  const { data, loading: loadingCategory, error: dropDownError } = useQuery(
    GET_CATEGORIES
  )
  const [getAttributes, { data: attributesData }] = useLazyQuery(GET_ATTRIBUTES)
  const [mutate] = useMutation(mutation, {
    onCompleted,
    onError,
    refetchQueries: [{ query: GET_PRODUCTS }]
  })

  const [attributes, setAttribute] = useState([])

  const [success, successSetter] = useState('')
  const [error, errorSetter] = useState('')
  const [categoryError, categoryErrorSetter] = useState(null)
  const [productTitleError, setProductTitleError] = useState(null)
  const [productCodeError, setProductCodeError] = useState(null)
  const [descriptionError, setDescriptionError] = useState(null)
  const [mainPriceError, setMainPriceError] = useState(null)
  const [attributeError, setAttrbuteError] = useState(null)
  const [mutationLoader, setMutationLoader] = useState(false)
  const [image, setImage] = useState(
    product ? Object.assign({}, product.image) : {}
  )

  const onBlur = (setter, field, state) => {
    setter(!validateFunc({ [field]: state }, field))
  }

  const clearFields = () => {
    formRef.current.reset()
    setProductTitleError(null)
    setImage({})
    categoryErrorSetter(null)
    setProductTitleError(null)
    setProductCodeError(null)
    setDescriptionError(null)
    setMainPriceError(null)
    setAttrbuteError(null)
    setAttribute([])
  }

  function onCompleted(data) {
    setMutationLoader(false)
    const message = props.product
      ? 'Product updated successfully'
      : 'Product added successfully'
    successSetter(message)
    errorSetter('')
    if (!props.product) clearFields()
    setTimeout(hideMessage, 3000)
  }
  function onError(error) {
    console.log('error', error)
    setMutationLoader(false)
    const message = 'Action failed. Please Try again'
    successSetter('')
    errorSetter(message)
    setTimeout(hideMessage, 3000)
  }

  const hideMessage = () => {
    successSetter('')
    errorSetter('')
  }

  function handleAttributeChange(event, outerIndex, index, type) {
    const attribute = attributes

    if (type === 'price') {
      attribute[outerIndex].options[index].price = Number(event.target.value)
      setAttribute([...attribute])
    } else if (type === 'check') {
      attribute[outerIndex].options[index].check = event.target.checked
      setAttribute([...attribute])
    } else {
      attribute[outerIndex].options[index].stock = Number(event.target.value)
      setAttribute([...attribute])
    }
  }

  const validate = () => {
    let mainError = false
    const checkCount = []
    const titleError = !validateFunc(
      { productTitle: formRef.current['input-productTitle'].value },
      'productTitle'
    )
    const codeError = !validateFunc(
      { productCode: formRef.current['input-productCode'].value },
      'productCode'
    )
    const priceError = !validateFunc(
      { productPrice: formRef.current['input-mainPrice'].value },
      'productPrice'
    )
    const categoryError = !validateFunc(
      { sub_category: formRef.current.sub_category.value },
      'sub_category'
    )
    const attribute = attributes
    attribute.map(item =>
      item.options.map(i => {
        if (i.check) {
          checkCount.push(i)
        }
        return null
      })
    )

    const checkList = checkCount.filter(
      i =>
        !validateFunc({ optionPrice: i.price }, 'optionPrice') &&
        !validateFunc({ optionQuantity: i.stock }, 'optionQuantity')
    )
    if (checkList.length < 1) {
      mainError = false
    } else {
      if (checkCount.length === checkList.length) mainError = true
      else mainError = false
    }

    setProductCodeError(codeError)
    setProductTitleError(titleError)
    setMainPriceError(priceError)
    categoryErrorSetter(categoryError)
    setAttrbuteError(mainError)

    return mainError && categoryError && codeError && titleError && priceError
  }

  const onDismiss = () => {
    successSetter('')
    errorSetter('')
  }

  const uploadImageToCloudinary = async(imgMenu, index) => {
    if (imgMenu === '') {
      return imgMenu
    }
    const dataImage = image
    if (product && dataImage[index] === imgMenu) {
      return imgMenu
    }

    const apiUrl = cloudinaryUploadUrl
    const data = {
      file: imgMenu,
      upload_preset: cloudinaryProducts
    }
    try {
      const result = await fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
      const imageData = await result.json()
      return imageData.secure_url
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getSelectedAttributes()
  }, [])

  function getSelectedAttributes() {
    if (props.product && props.product.subCategory) {
      getAttributes({
        variables: { subCategory: formRef.current.sub_category.value }
      })
    }
  }

  useEffect(() => {
    populateAttributes()
  }, [attributesData])

  function populateAttributes() {
    if (attributesData && attributesData.getOptionGroupsByCategory) {
      const data = attributesData.getOptionGroupsByCategory.map(attribute => ({
        _id: attribute._id,
        title: attribute.title,
        options: attribute.options.map(({ _id, title }) => {
          if (product && product.attributes) {
            const selectedAttribute = product.attributes.find(
              item => item.attributeId === attribute._id
            )
            if (selectedAttribute && selectedAttribute.options) {
              const selectedOption = selectedAttribute.options.find(
                data => data.optionId === _id
              )
              if (selectedOption) {
                return {
                  _id,
                  title,
                  stock: selectedOption.stock,
                  price: selectedOption.price,
                  check: true
                }
              }
            }
          }
          return {
            _id,
            title,
            stock: '',
            price: '',
            check: false
          }
        })
      }))
      setAttribute(data)
    }
  }

  const { t } = props
  return (
    <Row>
      <Col className="order-xl-1">
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">
                  {props.attribute ? 'Edit Product' : 'Add Product'}
                </h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <form ref={formRef}>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="input-productTitle">
                      {'Product Title'}
                    </label>
                    <FormGroup
                      className={
                        productTitleError === null
                          ? ''
                          : productTitleError
                            ? 'has-success'
                            : 'has-danger'
                      }>
                      <Input
                        className="form-control-alternative"
                        id="input-productTitle"
                        placeholder="e.g Dotted Shirt"
                        type="text"
                        defaultValue={productTitle}
                        onBlur={event => {
                          onBlur(
                            setProductTitleError,
                            'productTitle',
                            event.target.value
                          )
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="input-productCode">
                      {'SKU Code'}
                    </label>
                    <FormGroup
                      className={
                        productCodeError === null
                          ? ''
                          : productCodeError
                            ? 'has-success'
                            : 'has-danger'
                      }>
                      <Input
                        className="form-control-alternative"
                        id="input-productCode"
                        placeholder="e.g MLK-234"
                        type="text"
                        defaultValue={productCode}
                        onBlur={event => {
                          onBlur(
                            setProductCodeError,
                            'productCode',
                            event.target.value
                          )
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <label className="form-control-label" htmlFor="input-title">
                      {'Description'}
                    </label>
                    <br />
                    <FormGroup
                      className={
                        descriptionError === null
                          ? ''
                          : descriptionError
                            ? 'has-success'
                            : 'has-danger'
                      }>
                      <Input
                        className="form-control-alternative"
                        name="input-description"
                        id="input-description"
                        placeholder="e.g "
                        type="textarea"
                        style={{ resize: 'none', height: '150px' }}
                        defaultValue={description}
                        onBlur={event => {
                          onBlur(
                            setDescriptionError,
                            'productDescription',
                            event.target.value
                          )
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <label className="form-control-label" htmlFor="input-title">
                      {'Price'}
                    </label>
                    <br />
                    <FormGroup
                      className={
                        mainPriceError === null
                          ? ''
                          : mainPriceError
                            ? 'has-success'
                            : 'has-danger'
                      }>
                      <Input
                        className="form-control-alternative"
                        name="input-mainPrice"
                        id="input-mainPrice"
                        placeholder="e.g 0"
                        type="number"
                        min={'0'}
                        defaultValue={mainPrice}
                        onBlur={event => {
                          onBlur(setMainPriceError, 'price', event.target.value)
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="input-category">
                      {t('Category')}
                    </label>
                    {dropDownError ? (
                      ' Error'
                    ) : (
                      <FormGroup
                        className={
                          categoryError === null
                            ? ''
                            : categoryError
                              ? 'has-success'
                              : 'has-danger'
                        }>
                        <Input
                          type="select"
                          name="sub_category"
                          id="sub_category"
                          defaultValue={category}
                          onChange={() => {
                            getAttributes({
                              variables: {
                                subCategory: formRef.current.sub_category.value
                              }
                            })
                          }}
                          onBlur={event => {
                            onBlur(
                              categoryErrorSetter,
                              'sub_category',
                              event.target.value
                            )
                          }}>
                          {loadingCategory ? (
                            <option value={''}>{'Loading'}</option>
                          ) : (
                            <>
                              {!category && (
                                <option value={''}>{t('Select')}</option>
                              )}
                              {data.subCategories.map(subCategory => (
                                <option
                                  value={subCategory._id}
                                  key={subCategory._id}>
                                  {subCategory.category.title +
                                    ' / ' +
                                    subCategory.title}
                                </option>
                              ))}
                            </>
                          )}
                        </Input>
                      </FormGroup>
                    )}
                  </Col>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="input-features">
                      {t('Featured')}
                    </label>
                    <FormGroup>
                      <label className="custom-toggle">
                        <input
                          name={'input-featured'}
                          id={'input-featured'}
                          defaultChecked={isFeatured}
                          type="checkbox"
                        />
                        <span className="custom-toggle-slider rounded-circle" />
                      </label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup
                      className={classNames({
                        'has-danger': attributeError === false
                      })}>
                      <label
                        className="form-control-label"
                        htmlFor="input-category">
                        {'Attributes'}
                      </label>
                      <br />
                      <small style={{ color: 'blue' }}>
                        Select Atleast one options of every option
                      </small>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12">
                    {attributes.map((options, outerIndex) => (
                      <div key={outerIndex}>
                        <Row>
                          <Col lg="6">
                            <label>
                              {outerIndex + 1}
                              {' - '}
                              {options.title}
                            </label>
                          </Col>
                          <Col lg="3">
                            <label>{'Stock'}</label>
                          </Col>
                          <Col lg="3">
                            <label>{'Price'}</label>
                          </Col>
                        </Row>
                        {options.options.map((option, index) => (
                          <div key={option._id}>
                            <Row>
                              <Col lg="6">
                                <FormGroup check className="mb-2 pt-2 ml-4">
                                  <Label
                                    check
                                    className={
                                      'text-capitalize text-muted pl-2'
                                    }>
                                    <Input
                                      value={option._id}
                                      type="checkbox"
                                      checked={option.check}
                                      onChange={event =>
                                        handleAttributeChange(
                                          event,
                                          outerIndex,
                                          index,
                                          'check'
                                        )
                                      }
                                    />
                                    {option.title}
                                  </Label>
                                </FormGroup>
                              </Col>
                              <Col lg="3">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    value={option.stock}
                                    placeholder="e.g 1"
                                    type="number"
                                    onChange={event => {
                                      handleAttributeChange(
                                        event,
                                        outerIndex,
                                        index,
                                        'quantity'
                                      )
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="3">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    value={option.price}
                                    placeholder="e.g $10"
                                    type="number"
                                    onChange={event => {
                                      handleAttributeChange(
                                        event,
                                        outerIndex,
                                        index,
                                        'price'
                                      )
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        ))}
                      </div>
                    ))}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3 className="mb-2"> {t('Product Image')}</h3>
                    <Row>
                      <MultiImageInput
                        images={image}
                        setImages={setImage}
                        theme={{
                          outlineColor: 'grey',
                          background: 'transparent'
                        }}
                        allowCrop={false}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row className="mt-2 justify-content-center">
                  <Col lg="4">
                    {mutationLoader ? (
                      <Button
                        disabled
                        color="primary"
                        size="lg"
                        className="btn-block"
                        onClick={() => null}>
                        <Loader
                          type="TailSpin"
                          color="#FFF"
                          height={25}
                          width={30}
                          visible={mutationLoader}
                        />
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        size="lg"
                        disabled={mutationLoader}
                        className="btn-block"
                        onClick={async e => {
                          if (validate()) {
                            setMutationLoader(true)
                            const objToArray = Object.keys(image).map(key => [
                              image[key]
                            ])
                            const images = objToArray.map(
                              async(item, index) => {
                                return await uploadImageToCloudinary(
                                  item,
                                  index
                                )
                              }
                            )
                            const selectedAttributes = attributes.map(
                              ({ _id, title, options }) => {
                                return {
                                  attributeId: _id,
                                  title,
                                  options: options
                                    .filter(option => option.check)
                                    .map(({ check, ...item }) => ({
                                      optionId: item._id,
                                      title: item.title,
                                      stock: item.stock,
                                      price: item.price
                                    }))
                                }
                              }
                            )
                            const cloudinaryImages = await Promise.all(images)
                            mutate({
                              variables: {
                                productInput: {
                                  _id: product ? product._id : '',
                                  title:
                                    formRef.current['input-productTitle'].value,
                                  skuCode:
                                    formRef.current['input-productCode'].value,
                                  price: Number(
                                    formRef.current['input-mainPrice'].value
                                  ),
                                  image: cloudinaryImages,
                                  attributes: selectedAttributes,
                                  description:
                                    formRef.current['input-description'].value,
                                  subCategory:
                                    formRef.current.sub_category.value,
                                  featured: Boolean(
                                    formRef.current['input-featured'].checked
                                  )
                                }
                              }
                            })
                          }
                        }}>
                        {'Save'}
                      </Button>
                    )}
                  </Col>
                  <Alert color="success" isOpen={!!success} toggle={onDismiss}>
                    {success}
                  </Alert>
                  <Alert color="danger" isOpen={!!error} toggle={onDismiss}>
                    {error}
                  </Alert>
                </Row>
              </div>
            </form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default withTranslation()(Product)
