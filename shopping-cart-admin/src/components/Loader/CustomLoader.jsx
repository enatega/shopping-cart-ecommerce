import React from 'react'
import Loader from 'react-loader-spinner'

const CustomLoader = () => (
  <div style={{ padding: '50px' }}>
    <Loader type="TailSpin" color="#d5ac84" height={120} width={120} />
  </div>
)

export default CustomLoader
