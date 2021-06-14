import React, { useState, useRef } from 'react'
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input,
  Button
} from 'reactstrap'
import { withTranslation } from 'react-i18next'
import {
  createAttributes,
  editAttributes,
  subCategories,
  attributes
} from '../../apollo/server'
import { validateFunc } from '../../constraints/constraints'
import Loader from 'react-loader-spinner'
import { gql, useQuery, useMutation } from '@apollo/client'

const CREATE_ATTRIBUTE = gql`
  ${createAttributes}
`
const EDIT_ATTRIBUTE = gql`
  ${editAttributes}
`

const GET_ATTRIBUTES = gql`
  ${attributes}
`
const GET_CATEGORIES = gql`
  ${subCategories}
`

function Attribute(props) {
  const formRef = useRef()
  const mutation = props.attribute ? EDIT_ATTRIBUTE : CREATE_ATTRIBUTE
  const { data, loading: loadingCategory } = useQuery(GET_CATEGORIES)
  const [mutate, { loading }] = useMutation(mutation, {
    onCompleted,
    onError,
    refetchQueries: [{ query: GET_ATTRIBUTES }]
  })

  const option = props.attribute
    ? props.attribute.options.map(({ _id, title }) => ({
      _id,
      title,
      optionError: null
    }))
    : [
      {
        _id: '',
        title: '',
        optionError: null
      }
    ]
  const [category, categorySetter] = useState(
    props.attribute ? props.attribute.subCategory._id : ''
  )
  const [title, titleSetter] = useState(
    props.attribute ? props.attribute.title : ''
  )
  const [options, optionsSetter] = useState(option)
  const [success, successSetter] = useState('')
  const [error, errorSetter] = useState('')
  const [categoryError, categoryErrorSetter] = useState(null)
  const [titleError, titleErrorSetter] = useState(null)

  const onBlur = (setter, field, state) => {
    setter(!validateFunc({ [field]: state }, field))
  }

  const onBlurOptions = (index, type) => {
    const option = options
    option[index].optionError = !!validateFunc(
      { title: option[index][type] },
      'title'
    )
    optionsSetter([...option])
  }
  const onChange = (event, index, state) => {
    const option = options
    option[index][state] = event.target.value
    optionsSetter([...option])
  }

  function onCompleted() {
    const message = props.attribute
      ? 'Attribute updated successfully'
      : 'Attribute added successfully'
    successSetter(message)
    errorSetter('')
    if (!props.attribute) clearFields()
    setTimeout(hideMessage, 3000)
  }

  function onError() {
    const message = 'Action failed. Please Try again'
    successSetter('')
    errorSetter(message)
    setTimeout(hideMessage, 3000)
  }

  const hideMessage = () => {
    successSetter('')
    errorSetter('')
  }

  const clearFields = () => {
    formRef.current['input-attribute'].value = ''
    titleErrorSetter(null)
    optionsSetter([
      {
        _id: '',
        title: '',
        optionError: null
      }
    ])
    categoryErrorSetter(null)
  }

  const onAdd = index => {
    const option = options
    if (index === option.length - 1) {
      option.push({ _id: '', title: '', optionError: null })
    } else {
      option.splice(index + 1, 0, { optionName: '', optionError: null })
    }
    optionsSetter([...option])
  }
  const onRemove = index => {
    if (options.length === 1 && index === 0) {
      return
    }
    const option = options
    option.splice(index, 1)
    optionsSetter([...option])
  }

  const validate = () => {
    let mainError = false
    const categoryError = !validateFunc(
      { sub_category: category },
      'sub_category'
    )
    const titleError = !validateFunc(
      { attributeName: formRef.current['input-attribute'].value },
      'attributeName'
    )
    const option = options
    option.map((option, index) => {
      onBlurOptions(index, 'title')
      return option
    })
    const error = option.filter(option => option.optionError)
    if (!error.length) {
      mainError = true
    }

    titleErrorSetter(titleError)
    categoryErrorSetter(categoryError)
    return mainError && categoryError
  }

  const onDismiss = () => {
    successSetter('')
    errorSetter('')
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
                  {props.attribute ? 'Edit Attribute' : 'Add Attribute'}
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
                      htmlFor="input-category">
                      {t('Category')}
                    </label>
                    {error ? (
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
                          value={category}
                          onChange={event => {
                            categorySetter(event.target.value)
                          }}
                          onBlur={event => {
                            onBlur(
                              categoryErrorSetter,
                              'sub_category',
                              category
                            )
                          }}>
                          {loadingCategory ? (
                            <option>{'Loading'}</option>
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
                </Row>
                <Row>
                  <Col lg="6">
                    <label className="form-control-label" htmlFor="input-title">
                      {t('Title')}
                    </label>
                    <br />
                    <FormGroup
                      className={
                        titleError === null
                          ? ''
                          : titleError
                            ? 'has-success'
                            : 'has-danger'
                      }>
                      <Input
                        className="form-control-alternative"
                        id="input-attribute"
                        placeholder="e.g Color"
                        type="text"
                        defaultValue={title}
                        onChange={event => {
                          titleSetter(event.target.value)
                        }}
                        onBlur={event => {
                          onBlur(
                            titleErrorSetter,
                            'attributeName',
                            event.target.value
                          )
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12">
                    <label className="form-control-label" htmlFor="input-title">
                      {t('Options')}
                    </label>
                    <br />
                    {options.map((option, index) => (
                      <Row key={index}>
                        <Col lg="6">
                          <FormGroup
                            className={
                              option.optionError === null
                                ? ''
                                : option.optionError
                                  ? 'has-danger'
                                  : 'has-success'
                            }>
                            <Input
                              className="form-control-alternative"
                              id="input-title"
                              placeholder="e.g Black"
                              type="text"
                              value={option.title}
                              onChange={event => {
                                onChange(event, index, 'title')
                              }}
                              onBlur={event => {
                                onBlurOptions(index, 'title')
                              }}
                            />
                          </FormGroup>
                        </Col>
                        {!props.option && (
                          <Col lg="3">
                            <Button
                              color="danger"
                              onClick={() => {
                                onRemove(index)
                              }}>
                              {'-'}
                            </Button>{' '}
                            <Button
                              onClick={() => {
                                onAdd(index)
                              }}
                              color="primary">
                              {'+'}
                            </Button>
                          </Col>
                        )}
                      </Row>
                    ))}
                  </Col>
                </Row>
                <Row>
                  <Col lg="4">
                    {loading ? (
                      <Button disabled color="primary" onClick={() => null}>
                        <Loader
                          type="TailSpin"
                          color="#FFF"
                          height={25}
                          width={30}
                          visible={loading}
                        />
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        disabled={loading}
                        onClick={() => {
                          if (validate()) {
                            mutate({
                              variables: {
                                optionGroupInput: {
                                  _id: props.attribute
                                    ? props.attribute._id
                                    : '',
                                  title:
                                    formRef.current['input-attribute'].value,
                                  subCategory:
                                    formRef.current.sub_category.value,
                                  options: options.map(option => ({
                                    _id: option._id,
                                    title: option.title
                                  }))
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

export default withTranslation()(Attribute)
