import React, { useState } from 'react'
// node.js library that concatenates classes (strings)
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  Row,
  FormGroup,
  Input,
  Col
} from 'reactstrap'

import Header from 'components/Headers/Header.jsx'
import {
  getDashboardTotal,
  getDashboardSales,
  getDashboardOrders
} from '../apollo/server'
import { gql, useQuery } from '@apollo/client'

const GET_DASHBOARD_TOTAL = gql`
  ${getDashboardTotal}
`
const GET_DASHBOARD_SALES = gql`
  ${getDashboardSales}
`
const GET_DASHBOARD_ORDERS = gql`
  ${getDashboardOrders}
`

const dataLine = {
  datasets: {
    label: 'Sales Amount',
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10
  }
}
const dataBar = {
  datasets: {
    label: 'Order count',
    backgroundColor: 'rgba(255,99,132,0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)'
  }
}

const intializeStartDate = () => {
  var d = new Date()
  d.setDate(d.getDate() - 7)
  return d.toISOString().substr(0, 10)
}
const Dashboard = props => {
  const [startingDate, setStartingDate] = useState(intializeStartDate)
  const [endingDate, setEndingDate] = useState(
    new Date().toISOString().substr(0, 10)
  )
  const { data: dataToal, loading: loadingTotal, error: errorTotal } = useQuery(
    GET_DASHBOARD_TOTAL,
    {
      variables: {
        startingDate: startingDate.toString(),
        endingDate: endingDate.toString()
      }
    }
  )
  const {
    data: dataSales,
    loading: loadingSales,
    error: errorSales
  } = useQuery(GET_DASHBOARD_SALES, {
    variables: {
      startingDate: startingDate.toString(),
      endingDate: endingDate.toString()
    }
  })
  const {
    data: dataOrder,
    loading: loadingOrder,
    error: errorOrder
  } = useQuery(GET_DASHBOARD_ORDERS, {
    variables: {
      startingDate: startingDate.toString(),
      endingDate: endingDate.toString()
    }
  })

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {errorTotal ? null : (
          <Row>
            <Col className="mb-lg-5 mb-sm-3" xl="6">
              <Card className="card-stats mb-4 mb-lg-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle className="text-uppercase text-muted mb-0">
                        {'Total Orders'}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {loadingTotal
                          ? '...'
                          : dataToal.getDashboardTotal.total_orders}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="ni ni-cart" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-lg-5 mb-sm-3" xl="6">
              <Card className="card-stats mb-4 mb-lg-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle className="text-uppercase text-muted mb-0">
                        {'Total Users'}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {loadingTotal
                          ? '...'
                          : dataToal.getDashboardTotal.total_users}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="ni ni-single-02" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-lg-5 mb-sm-3" xl="6">
              <Card className="card-stats mb-4 mb-lg-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle className="text-uppercase text-muted mb-0">
                        {'Total Sales'}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {loadingTotal
                          ? '...'
                          : dataToal.getDashboardTotal.total_sales}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-lg-5 mb-sm-3" xl="6">
              <Card className="card-stats mb-4 mb-lg-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle className="text-uppercase text-muted mb-0">
                        {'Average Ratings/Total Ratings'}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {loadingTotal
                          ? '...'
                          : dataToal.getDashboardTotal.avg_ratings}
                        /
                        {loadingTotal
                          ? '...'
                          : dataToal.getDashboardTotal.total_ratings}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-star" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        <Row className="mb-lg-5 mb-sm-3">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <h6 className="text-uppercase text-light ls-1 mb-1">
                    Filter Graph
                  </h6>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xl="4">
                    <FormGroup>
                      <label className="form-control-label">
                        Starting Date
                      </label>
                      <Input
                        className="form-control-alternative"
                        type="date"
                        max={new Date().toISOString().substr(0, 10)}
                        onChange={event => {
                          console.log(event.target.value)
                          setStartingDate(event.target.value)
                        }}
                        value={startingDate}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="4">
                    <FormGroup>
                      <label className="form-control-label">Ending Date</label>
                      <Input
                        className="form-control-alternative"
                        type="date"
                        max={new Date().toISOString().substr(0, 10)}
                        onChange={event => {
                          setEndingDate(event.target.value)
                        }}
                        value={endingDate}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-description">
                        {'Filter Graph'}
                      </label>
                      <Button className="btn-block" color="primary">
                        {'Submit'}
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {errorSales ? null : (
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        {'Overview'}
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={{
                        labels: loadingSales
                          ? []
                          : dataSales.getDashboardSales.orders.map(d => d.day),
                        datasets: [
                          {
                            ...dataLine.datasets,
                            data: loadingSales
                              ? []
                              : dataSales.getDashboardSales.orders.map(
                                d => d.amount
                              )
                          }
                        ]
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          )}
          {errorOrder ? null : (
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        {'Performance'}
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={{
                        labels: loadingOrder
                          ? []
                          : dataOrder.getDashboardOrders.orders.map(d => d.day),
                        datasets: [
                          {
                            ...dataBar.datasets,
                            data: loadingOrder
                              ? []
                              : dataOrder.getDashboardOrders.orders.map(
                                d => d.count
                              )
                          }
                        ]
                      }}
                      width={100}
                      height={50}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
