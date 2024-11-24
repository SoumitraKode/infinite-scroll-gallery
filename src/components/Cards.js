import React from 'react'
import Card from './Card';

const Cards = (props) => {
    let photos = props.photos;
  
  return (
    <div className="cardsWrapper">
      {
        photos.map( (photo) => (
            <Card key={photo.id} 
            photo = {photo} 
            />
        ))
      }
    </div>
  )
}

export default Cards
