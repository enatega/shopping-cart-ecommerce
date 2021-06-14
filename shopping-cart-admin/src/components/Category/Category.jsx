/* eslint-disable camelcase */
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { validateFunc } from '../../constraints/constraints'
import { withTranslation } from 'react-i18next'
import Loader from 'react-loader-spinner'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  UncontrolledAlert
} from 'reactstrap'

import { editCategory, createCategory, categories } from '../../apollo/server'

const CREATE_CATEGORY = gql`
  ${createCategory}
`
const EDIT_CATEGORY = gql`
  ${editCategory}
`
const GET_CATEGORIES = gql`
  ${categories}
`

function Category(props) {
  const [title, titleSetter] = useState(
    props.category ? props.category.title : ''
  )
  const [errorMessage, errorMessageSetter] = useState('')
  const [successMessage, successMessageSetter] = useState('')
  const [titleError, titleErrorSetter] = useState(null)
  const mutation = props.category ? EDIT_CATEGORY : CREATE_CATEGORY
  const [mutate, { loading }] = useMutation(mutation, {
    onCompleted,
    onError,
    refetchQueries: [{ query: GET_CATEGORIES }]
  })

  const onBlur = (setter, field, state) => {
    setter(!validateFunc({ [field]: state }, field))
  }
  const onSubmitValidaiton = () => {
    const titleError = !validateFunc(
      { category_title: title },
      'category_title'
    )
    titleErrorSetter(titleError)
    return titleError
  }
  const clearFields = () => {
    titleSetter('')
    titleErrorSetter(null)
  }
  function onCompleted(data) {
    const message = props.category
      ? 'Category updated successfully'
      : 'Category added successfully'
    successMessageSetter(message)
    errorMessageSetter('')
    if (!props.category) clearFields()
    setTimeout(hideMessage, 3000)
  }
  function onError() {
    const message = 'Action failed. Please Try again'
    successMessageSetter('')
    errorMessageSetter(message)
    setTimeout(hideMessage, 3000)
  }
  const hideMessage = () => {
    successMessageSetter('')
    errorMessageSetter('')
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
                  {props.category ? t('Edit Category') : t('Add Category')}
                </h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <div className="pl-lg-4">
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
                        id="input-title"
                        placeholder="e.g "
                        type="text"
                        value={title}
                        onChange={event => {
                          titleSetter(event.target.value)
                        }}
                        onBlur={event => {
                          onBlur(titleErrorSetter, 'category_title', title)
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {loading ? (
                    <Col className="text-right" xs="12">
                      <Button color="primary" onClick={() => null}>
                        <Loader
                          type="TailSpin"
                          color="#FFF"
                          height={25}
                          width={30}
                          visible={loading}
                        />
                      </Button>
                    </Col>
                  ) : (
                    <Col className="text-right" xs="12">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={async e => {
                          e.preventDefault()
                          if (onSubmitValidaiton()) {
                            mutate({
                              variables: {
                                _id: props.category ? props.category._id : '',
                                title: title
                              }
                            })
                          }
                        }}
                        size="md">
                        {t('Save')}
                      </Button>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col lg="6">
                    {!!successMessage && (
                      <UncontrolledAlert color="success" fade={true}>
                        <span className="alert-inner--icon">
                          <i className="ni ni-like-2" />
                        </span>{' '}
                        <span className="alert-inner--text">
                          <strong>{t('Success')}!</strong> {successMessage}
                        </span>
                      </UncontrolledAlert>
                    )}
                    {!!errorMessage && (
                      <UncontrolledAlert color="danger" fade={true}>
                        <span className="alert-inner--icon">
                          <i className="ni ni-like-2" />
                        </span>{' '}
                        <span className="alert-inner--text">
                          <strong>{t('Danger')}!</strong> {errorMessage}
                        </span>
                      </UncontrolledAlert>
                    )}
                  </Col>
                </Row>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default withTranslation()(Category)
