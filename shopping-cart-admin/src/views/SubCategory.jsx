/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import SubCategoryComponent from '../components/SubCategory/SubCategory'
import CustomLoader from '../components/Loader/CustomLoader'
// reactstrap components
import { Card, Container, Row, Modal } from 'reactstrap'
// core components
import Header from 'components/Headers/Header.jsx'
import { subCategories, deleteSubCategory } from '../apollo/server'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import { gql, useQuery } from '@apollo/client'
import ActionButton from '../components/ActionButton/ActionButton'

const GET_SUB_CATEGORIES = gql`
  ${subCategories}
`
const DELETE_SUB_CATEGORY = gql`
  ${deleteSubCategory}
`

const SubCategory = props => {
  const [editModal, setEditModal] = useState(false)
  const [subCategory, setSubCategory] = useState(null)
  const { data, loading, error } = useQuery(GET_SUB_CATEGORIES, {
    variables: { page: 0 }
  })
  const toggleModal = subCategory => {
    setEditModal(!editModal)
    setSubCategory(subCategory)
  }

  const customSort = (rows, field, direction) => {
    const handleField = row => {
      if (field === 'category.title') {
        if (row.category.title) {
          return row.category.title.toLowerCase()
        }
        return row.category.title
      } else {
        if (row[field]) {
          return row[field].toLowerCase()
        }

        return row[field]
      }
    }

    return orderBy(rows, handleField, direction)
  }

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection)

  const columns = [
    {
      name: 'Title',
      sortable: true,
      selector: 'title'
    },
    {
      name: 'Category',
      sortable: true,
      selector: 'category.title'
    },
    {
      name: 'Image',
      cell: row => (
        <>
          {!!row.image && (
            <img className="img-responsive" src={row.image} alt="img menu" />
          )}
          {!row.image && 'No Image'}
        </>
      )
    },
    {
      name: 'Action',
      cell: row => (
        <ActionButton
          deleteButton={true}
          editButton={true}
          row={row}
          mutation={DELETE_SUB_CATEGORY}
          editModal={toggleModal}
          refetchQuery={GET_SUB_CATEGORIES}
        />
      )
    }
  ]

  const { t } = props
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <SubCategoryComponent />
        {/* Table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="shadow">
              {error ? (
                <span>
                  {t('Error')}! ${error.message}
                </span>
              ) : (
                <DataTable
                  title={t('Sub Categories')}
                  columns={columns}
                  data={data ? data.subCategories : []}
                  pagination
                  progressPending={loading}
                  progressComponent={<CustomLoader />}
                  onSort={handleSort}
                  sortFunction={customSort}
                  defaultSortField="title"
                />
              )}
            </Card>
          </div>
        </Row>
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={editModal}
          toggle={() => {
            toggleModal(null)
          }}>
          <SubCategoryComponent subCategory={subCategory} />
        </Modal>
      </Container>
    </>
  )
}
export default withTranslation()(SubCategory)
