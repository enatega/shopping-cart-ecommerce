import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Col,
  Alert,
  ListGroup,
  ListGroupItem,
  Badge,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import { validateFunc } from '../../constraints/constraints'
import {
  updateOrderStatus,
  getPaymentStatuses,
  updatePaymentStatus,
  getConfiguration
} from '../../apollo/server'
import Loader from 'react-loader-spinner'
import { gql, useQuery, useMutation } from '@apollo/client'

// constants
const UPDATE_STATUS = gql`
  ${updateOrderStatus}
`
const GET_PAYMENT_STATUSES = gql`
  ${getPaymentStatuses}
`
const UPDATE_ORDER_STATUS = gql`
  ${updateOrderStatus}
`
const UPDATE_PAYMENT_STATUS = gql`
  ${updatePaymentStatus}
`
const GET_CONFIGURATION = gql`
  ${getConfiguration}
`

function Order(props) {
  const { order } = props
  const [reason, reasonSetter] = useState('')
  const [selectedStatus, selectedStatusSetter] = useState('')
  const [selectedPaymentStatus, selectedPaymentStatusSetter] = useState('')
  const [customerCollapse, customerCollapseSetter] = useState(true)
  const [orderCollapse, orderCollapseSetter] = useState(true)
  const [reasonError, reasonErrorSetter] = useState(null)
  const [error, errorSetter] = useState('')
  const [success, successSetter] = useState('')

  const {
    data: paymentData,
    loading: paymentLoading,
    error: paymentError
  } = useQuery(GET_PAYMENT_STATUSES)
  const {
    data: configData,
    loading: configLoading,
    error: configError
  } = useQuery(GET_CONFIGURATION)

  const [mutateStatus, { loading: updateLoading }] = useMutation(
    UPDATE_STATUS,
    { onCompleted, onError }
  )
  const [
    updateOrderStatus,
    { loading: updateOrderLoading }
  ] = useMutation(UPDATE_ORDER_STATUS, { onCompleted, onError })
  const [
    updatePaymentStatus,
    { loading: updatePaymentLoading }
  ] = useMutation(UPDATE_PAYMENT_STATUS, { onCompleted, onError })

  useEffect(() => {
    console.log('State Log: ', order)
  }, [])
  const toggle = state => {
    if (state === 'Order') orderCollapseSetter(prev => !prev)
    else if (state === 'Customer') customerCollapseSetter(prev => !prev)
  }
  const validateReason = () => {
    const reasonError = !validateFunc({ reason }, 'reason')
    reasonErrorSetter(reasonError)
    console.log(reasonError)
    return reasonError
  }
  function onCompleted({
    updateStatus,
    updateOrderStatus,
    updatePaymentStatus
  }) {
    if (updateStatus) {
      successSetter('Status Updated')
    } else if (updateOrderStatus) {
      successSetter('Order status updated')
    } else if (updatePaymentStatus) {
      successSetter('Payment status updated')
    }
  }
  function onError(error) {
    errorSetter(error.message)
  }
  const validateStatus = () => {
    return !!selectedStatus
  }
  const validatePaymentStatus = () => {
    return !!selectedPaymentStatus
  }
  const onDismiss = () => {
    console.log('onDismiss')
    errorSetter('')
    successSetter('')
  }
  const onChangeStatus = event => {
    selectedStatusSetter(event.target.value)
  }
  const onChangePaymentStatus = event => {
    selectedPaymentStatusSetter(event.target.value)
  }
  const { t } = props
  if (!props.order) return null
  return (
    <Card className="bg-secondary shadow">
      <CardHeader className="bg-white border-0">
        <Row className="align-items-center">
          <Col xs="8">
            <h3 className="mb-0">
              {t('Order')}#{order.orderId}
            </h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Form>
          <div className="pl-lg-4">
            {(error || success) && (
              <Row>
                <Col lg="12">
                  <Alert
                    color="success"
                    isOpen={!!success}
                    fade={true}
                    toggle={onDismiss}>
                    <span className="alert-inner--text">{success}</span>
                  </Alert>
                  <Alert
                    color="danger"
                    isOpen={!!error}
                    fade={true}
                    toggle={onDismiss}>
                    <span className="alert-inner--text">{error}</span>
                  </Alert>
                </Col>
              </Row>
            )}
            {order.orderStatus !== 'CANCELLED' &&
              order.orderStatus !== 'DELIVERED' && (
              <Row className="mb-2">
                <Col lg="12">
                  <div>
                    {updateLoading ? (
                      <Loader
                        className="text-center"
                        type="TailSpin"
                        color="#fb6340"
                        height={40}
                        width={40}
                        visible={updateLoading}
                      />
                    ) : (
                      <FormGroup
                        className={
                          reasonError === null
                            ? ''
                            : reasonError
                              ? 'has-success'
                              : 'has-danger'
                        }>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <Button
                              disabled={
                                order.orderStatus !== 'CANCELLED' &&
                                  order.orderStatus !== 'PENDING'
                              }
                              color="success"
                              onClick={() => {
                                mutateStatus({
                                  variables: {
                                    id: order._id,
                                    status: 'ACCEPTED',
                                    reason: ''
                                  }
                                })
                              }}>
                              {order.status === true ? 'Accepted' : 'Accept'}
                            </Button>
                          </InputGroupAddon>
                          <Input
                            style={{ marginLeft: '5px' }}
                            placeholder="Reason if rejected..."
                            value={order.reason || reason}
                            // readOnly={status === false}
                            onChange={event => {
                              reasonSetter(event.target.value)
                            }}
                            maxLength={20}
                          />
                          <InputGroupAddon addonType="append">
                            <Button
                              disabled={order.orderStatus === 'CANCELLED'}
                              color="danger"
                              onClick={() => {
                                if (validateReason()) {
                                  mutateStatus({
                                    variables: {
                                      id: order._id,
                                      status: 'CANCELLED',
                                      reason: order.reason
                                    }
                                  })
                                }
                              }}>
                              {order.status === false
                                ? 'Cancelled'
                                : 'Cancel'}
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    )}
                  </div>
                </Col>
              </Row>
            )}
            {order.orderStatus !== 'PENDING' &&
              order.orderStatus !== 'CANCELLED' &&
              order.orderStatus !== 'DELIVERED' && (
              <>
                <Row>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="input-rider">
                      {t('Select Status')}
                    </label>
                    <FormGroup>
                      <InputGroup>
                        <Input
                          type="select"
                          name="select"
                          id="input-rider"
                          defaultValue={order.orderStatus}
                          onChange={onChangeStatus}>
                          <option></option>
                          <option value="DISPATCHED">DISPATCHED</option>
                          <option value="DELIVERED">DELIVERED</option>
                        </Input>

                        <InputGroupAddon addonType="append">
                          {updateOrderLoading ? (
                            <Button color="primary" onClick={() => null}>
                              <Loader
                                className="text-center"
                                type="TailSpin"
                                color="#FFF"
                                height={20}
                                width={40}
                                visible={updateOrderLoading}
                              />
                            </Button>
                          ) : (
                            <Button
                              color="primary"
                              disabled={order.orderStatus === selectedStatus}
                              onClick={() => {
                                if (validateStatus()) {
                                  updateOrderStatus({
                                    variables: {
                                      id: order._id,
                                      status: selectedStatus
                                    }
                                  })
                                }
                              }}>
                              {'Assign'}
                            </Button>
                          )}
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="status_Selected">
                      {t('Current Status')}
                    </label>
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        id="status_Selected"
                        type="text"
                        readOnly
                        value={order.orderStatus || ''}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="8">
                    <h3 className="mb-1">{t('Payment Status')}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="payment_Selected">
                      {t('Select Status')}
                    </label>
                    <FormGroup>
                      <InputGroup>
                        {paymentError ? (
                          <option>Error...</option>
                        ) : paymentLoading ? (
                          <option>Loading...</option>
                        ) : (
                          <Input
                            type="select"
                            name="select"
                            id="payment_Selected"
                            onChange={onChangePaymentStatus}
                            defaultValue={order.paymentStatus}>
                            <option disabled></option>
                            {paymentData.getPaymentStatuses.map(status => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </Input>
                        )}
                        <InputGroupAddon addonType="append">
                          {updatePaymentLoading ? (
                            <Button color="primary" onClick={() => null}>
                              <Loader
                                className="text-center"
                                type="TailSpin"
                                color="#FFF"
                                height={20}
                                width={40}
                                visible={updatePaymentLoading}
                              />
                            </Button>
                          ) : (
                            <Button
                              color="primary"
                              disabled={
                                order.paymentStatus === selectedPaymentStatus
                              }
                              onClick={() => {
                                if (validatePaymentStatus()) {
                                  updatePaymentStatus({
                                    variables: {
                                      id: order._id,
                                      status: selectedPaymentStatus
                                    }
                                  })
                                }
                              }}>
                              {'Assign'}
                            </Button>
                          )}
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="payment_Status">
                      {t('Current Status')}
                    </label>
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        id="payment_Status"
                        type="text"
                        readOnly
                        value={order.paymentStatus || ''}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </>
            )}
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-1">{t('Customer')}</h3>
              </Col>
              <Col xs="4">
                <Button
                  color="primary"
                  onClick={() => {
                    toggle('Customer')
                  }}
                  style={{ marginBottom: '1rem' }}>
                  Show/Hide
                </Button>
              </Col>
            </Row>
            <Collapse isOpen={customerCollapse}>
              <Row>
                <Col lg="4">
                  <label className="form-control-label" htmlFor="input-name">
                    {t('Name')}
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      id="input-name"
                      type="text"
                      disabled={true}
                      defaultValue={order.user.name}
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <label className="form-control-label" htmlFor="input-phone">
                    {t('Phone')}
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      id="input-phone"
                      type="text"
                      disabled={true}
                      defaultValue={order.user.phone}
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <label className="form-control-label" htmlFor="input-email">
                    {t('Email')}
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      type="text"
                      disabled={true}
                      defaultValue={order.user.email}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <label className="form-control-label" htmlFor="input-address">
                  {t('Address')}{' '}
                  <label className="text-muted">
                    {!!order.deliveryAddress.label &&
                      `(${order.deliveryAddress.label})`}
                  </label>
                </label>
              </Row>

              <Row>
                <Col lg="3">
                  <label
                    className="form-control-label"
                    htmlFor="address_region">
                    {t('Region')}
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      id="address_region"
                      type="text"
                      disabled={true}
                      defaultValue={order.deliveryAddress.region}
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <label className="form-control-label" htmlFor="address_city">
                    {t('City')}
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      id="address_city"
                      type="text"
                      disabled={true}
                      defaultValue={order.deliveryAddress.city}
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <label
                    className="form-control-label"
                    htmlFor="address_building">
                    {t('Building')}
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      id="address_building"
                      type="text"
                      disabled={true}
                      defaultValue={
                        order.deliveryAddress.apartment
                          ? order.deliveryAddress.building
                            ? 'Apartment: ' +
                              order.deliveryAddress.apartment +
                              ', Building: ' +
                              order.deliveryAddress.building
                            : 'Apartment: ' + order.deliveryAddress.apartment
                          : order.deliveryAddress.building
                            ? 'Building: ' + order.deliveryAddress.building
                            : ''
                      }
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <label
                    className="form-control-label"
                    htmlFor="address_details">
                    {t('Details')}
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      id="address_details"
                      type="text"
                      disabled={true}
                      defaultValue={order.deliveryAddress.details}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Collapse>
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-1">{t('Order Details')}</h3>
              </Col>
              <Col xs="4">
                <Button
                  color="primary"
                  onClick={() => {
                    toggle('Order')
                  }}
                  style={{ marginBottom: '1rem' }}>
                  Show/Hide
                </Button>
              </Col>
            </Row>
            <Collapse isOpen={orderCollapse}>
              {configError ? null : configLoading ? null : (
                <Row>
                  <Col lg="6">
                    <label className="form-control-label" htmlFor="input-items">
                      {t('Items')}
                    </label>
                    <FormGroup>
                      <ListGroup id="input-items">
                        {order.items.map(item => {
                          return (
                            <ListGroupItem
                              key={item._id}
                              className="justify-content-between">
                              <Badge
                                style={{
                                  fontSize: '12px',
                                  backgroundColor: 'grey',
                                  marginRight: '10px'
                                }}
                                pill>
                                {item.quantity}
                              </Badge>
                              {`${item.product}(${item.selectedAttributes.map(
                                i => i.title
                              )})`}
                              <Badge
                                style={{
                                  fontSize: '12px',
                                  backgroundColor: 'black',
                                  float: 'right'
                                }}
                                pill>
                                {configData.configuration.currencySymbol}{' '}
                                {(item.price * item.quantity).toFixed(2)}
                              </Badge>
                              {!!item.selectedAttributes.length && (
                                <UncontrolledDropdown>
                                  <DropdownToggle caret>
                                    {'Attributes'}
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    {item.selectedAttributes.map(
                                      (attribute, index) => {
                                        return (
                                          <DropdownItem key={index}>
                                            {attribute.title}:-{' '}
                                            {attribute.option.title}{' '}
                                            <Badge
                                              style={{
                                                fontSize: '12px',
                                                backgroundColor: 'black',
                                                float: 'right'
                                              }}
                                              pill>
                                              {
                                                configData.configuration
                                                  .currency_symbol
                                              }{' '}
                                              {attribute.option.price
                                                ? attribute.option.price
                                                : 0}
                                            </Badge>
                                          </DropdownItem>
                                        )
                                      }
                                    )}
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              )}
                            </ListGroupItem>
                          )
                        })}
                      </ListGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <Row>
                      <Col md="12">
                        <label
                          className="form-control-label"
                          htmlFor="input-price">
                          {t('Charges')}
                        </label>
                        <FormGroup>
                          <ListGroup id="input-price">
                            <ListGroupItem className="justify-content-between">
                              Subtotal
                              <Badge
                                style={{
                                  fontSize: '12px',
                                  color: 'black',
                                  float: 'right'
                                }}
                                pill>
                                {configData.configuration.currencySymbol}{' '}
                                {(
                                  order.orderAmount - order.deliveryCharges
                                ).toFixed(2)}
                              </Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                              {'Delivery Charges'}
                              <Badge
                                style={{
                                  fontSize: '12px',
                                  float: 'right',
                                  color: 'black'
                                }}>
                                {configData.configuration.currencySymbol}{' '}
                                {order.deliveryCharges.toFixed(2)}
                              </Badge>
                            </ListGroupItem>
                            <ListGroupItem className="justify-content-between">
                              {'Total'}
                              <Badge
                                style={{
                                  fontSize: '12px',
                                  color: 'black',
                                  float: 'right'
                                }}
                                pill>
                                {configData.configuration.currencySymbol}{' '}
                                {order.orderAmount.toFixed(2)}
                              </Badge>
                            </ListGroupItem>
                          </ListGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <label
                          className="form-control-label"
                          htmlFor="input-payment">
                          {t('Payment')}
                        </label>
                        <FormGroup>
                          <ListGroup id="input-payment">
                            <ListGroupItem className="justify-content-between">
                              Payment Method
                              <Badge
                                style={{
                                  fontSize: '12px',
                                  backgroundColor: 'green',
                                  float: 'right'
                                }}
                                pill>
                                {order.paymentMethod}
                              </Badge>
                            </ListGroupItem>
                            {order.orderStatus !== 'DELIVERED' && (
                              <ListGroupItem className="justify-content-between">
                                Paid Amount
                                <Badge
                                  style={{
                                    fontSize: '12px',
                                    float: 'right',
                                    color: 'black'
                                  }}>
                                  {configData.configuration.currency_symbol}{' '}
                                  {order.paid_amount
                                    ? order.paid_amount.toFixed(2)
                                    : 0}
                                </Badge>
                              </ListGroupItem>
                            )}
                          </ListGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
            </Collapse>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}
export default withTranslation()(Order)
