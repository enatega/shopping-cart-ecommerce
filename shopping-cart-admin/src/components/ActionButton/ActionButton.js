import React, { useState } from 'react'
import { Badge } from 'reactstrap'
import { categories, deleteCategory } from '../../apollo/server'
import Loader from 'react-loader-spinner'
import { useMutation, gql } from '@apollo/client'
import Alert from '../Alert'

const GET_CATEGORIES = gql`
  ${categories}
`
const DELETE_CATEGORY = gql`
  ${deleteCategory}
`

function ActionButton(props) {
  const mutation = props.mutation ? props.mutation : DELETE_CATEGORY
  const query = props.refetchQuery ? props.refetchQuery : GET_CATEGORIES
  const [isOpen, setIsOpen] = useState(false);
  var [mutate, { loading: deleteLoading }] = useMutation(mutation, {
    refetchQueries: [{ query: query }]
  })
  return (
    <>
      {props.editButton && (
        <>
        {isOpen && <Alert message="Delete feature will available after purchasing product" severity="warning" />}
          <Badge
            href="#pablo"
            onClick={e => {
              e.preventDefault()
              props.editModal(props.row)
            }}
            color="primary">
            {'Edit'}
          </Badge>
          &nbsp;&nbsp;
        </>
      )}
      {props.deleteButton && deleteLoading ? (
        <Loader
          type="ThreeDots"
          color="#BB2124"
          height={20}
          width={40}
          visible={deleteLoading}
        />
      ) : (
          <Badge
            href="#pablo"
            color="danger"
            onClick={e => {
              e.preventDefault()
              // mutate({
              //   variables: {
              //     id: props.row._id
              //   }
              // })

              setIsOpen(true)
              setTimeout(() => {
                setIsOpen(false);
              }, 2000);

            }}>
            {'Delete'}
          </Badge>
        )}
    </>
  )
}
export default React.memo(ActionButton)
