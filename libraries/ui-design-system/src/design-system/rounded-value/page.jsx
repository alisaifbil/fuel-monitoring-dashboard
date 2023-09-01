import React from 'react'

const RoundedValue = ({value, decimals , units}) => {
  return (
    <p className="font-normal text-sm text-gray-700">
        {" "}
        {units} {Math.round((value + Number.EPSILON) * Math.pow(10,decimals)) / Math.pow(10,decimals)}
      </p>
  )
}

export default RoundedValue