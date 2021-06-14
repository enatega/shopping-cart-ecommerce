import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Row,
  Col,
  Card,
  CardHeader,
  FormGroup,
  Form,
  Input,
  Button
} from 'reactstrap'
import { validateFunc } from '../../../constraints/constraints'
import { saveDeliveryConfiguration } from '../../../apollo/server'
import Loader from 'react-loader-spinner'
import { useMutation, gql } from '@apollo/client'

const SAVE_DELIVERY_CONFIGURATION = gql`
  ${saveDeliveryConfiguration}
`

function Delivery(props) {
  const [deliveryCharges, deliveryChargesSetter] = useState(
    props.deliveryCharges || 0
  )
  const [deliveryChargesError, deliveryChargesErrorSetter] = useState(null)
  const [
    saveConfiguration,
    { loading, error }
  ] = useMutation(SAVE_DELIVERY_CONFIGURATION, { onCompleted, onError })

  const onBlur = (setter, field, event) => {
    setter(!validateFunc({ [field]: event.target.value.trim() }, field))
  }
  const validateInput = () => {
    const deliveryChargesError = !isNaN(deliveryCharges)
    deliveryChargesErrorSetter(deliveryChargesError)
    return deliveryChargesError
  }
  function onCompleted(data) {
    console.log(data)
  }
  function onError(error) {
    console.log(error)
  }
  const { t } = props
  return (
    <Row className="mt-3">
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">{t('Delivery Charges')}</h3>
          </CardHeader>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col md="8">
                  <label
                    className="form-control-label"
                    htmlFor="input-deliverycharges">
                    {t('Price')}
                  </label>
                  <FormGroup
                    className={
                      deliveryChargesError === null
                        ? ''
                        : deliveryChargesError
                          ? 'has-success'
                          : 'has-danger'
                    }>
                    <Input
                      className="form-control-alternative"
                      id="input-deliverycharges"
                      placeholder="e.g 30.00"
                      type="number"
                      readOnly
                      defaultValue={deliveryCharges}
                      onChange={event => {
                        deliveryChargesSetter(event.target.value)
                      }}
                      onBlur={event => {
                        onBlur(
                          deliveryChargesErrorSetter,
                          'deliveryCharges',
                          event
                        )
                      }}></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  {error ? (
                    t('Error')
                  ) : loading ? (
                    <Button
                      className="btn-block mb-2"
                      color="primary"
                      onClick={() => null}>
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
                      disabled
                      className="btn-block mb-2"
                      type="button"
                      color="primary"
                      onClick={e => {
                        e.preventDefault()
                        if (validateInput()) {
                          saveConfiguration({
                            variables: {
                              configurationInput: {
                                deliveryCharges: Number(deliveryCharges)
                              }
                            }
                          })
                        }
                      }}
                      size="lg">
                      {t('Save')}
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          </Form>
        </Card>
      </div>
    </Row>
  )
}

export default withTranslation()(Delivery)
