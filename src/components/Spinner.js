import React from 'react'
import "./Spinner.css"
const Spinner = () => {
  return (
    <div className="spinnerWrapper"> 
      <div className='spinner'></div>
      <p className="LoadingText">Loading....</p>
    </div>
  )
}

export default Spinner
