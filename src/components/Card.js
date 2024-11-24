import React from 'react'
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"


const Card = (props) => {
    let photo = props.photo;
    const link = photo.links.html ;
    let navigate = useNavigate() ; 
    

  return (
    <div className='cardsWrapper2'>
        <Link to={link}>
            <div className='relative' >
                <img src={photo.urls.small}  alt=''/>
            </div>
        
            <div className='p-4'>
                
                <p className="PhotograperName">{photo.user.name}</p>
            
            </div>
        </Link>
    </div>
  )
}

export default Card ;
